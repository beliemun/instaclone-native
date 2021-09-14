import React from "react";
import * as CS from "./styles";
import Shared from "@Components";
import useUser from "~/hooks/useUser";
import { View } from "react-native";
import { useMutation } from "@apollo/client";
import {
  FOLLOWUSER_MUTATION,
  SEND_MESSAGE_MUTATION,
  UNFOLLOWUSER_MUTATION,
} from "~/common/mutations";
import { isChangedFollowVar } from "~/apollo";
import { useNavigation } from "@react-navigation/native";
import {
  AuthStackParamList,
  ProfileScreenNavigationProp,
} from "types/navigation/auth";
import { seeProfile_seeProfile } from "types/__generated__/seeProfile";
import { StackNavigationProp } from "@react-navigation/stack";

interface IProps {
  user: seeProfile_seeProfile;
}

const ProfileActions: React.FC<IProps> = ({ user }) => {
  const { id, userName, isMe, isFollowing } = user;
  const loggedInUser = useUser();
  const profileScreenNavigation = useNavigation<ProfileScreenNavigationProp>();
  const messageStackNavigation =
    useNavigation<StackNavigationProp<AuthStackParamList>>();

  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION
  );
  const sendMessage = async () => {
    await sendMessageMutation({
      variables: {
        userId: id,
        text: "Hello~ 👋",
      },
      update: (cache, result) => {
        const {
          data: {
            sendMessage: { ok, id },
          },
        } = result;
        if (!ok) return;
        messageStackNavigation.navigate("Messages", {
          id: id,
          target: user,
        });
        // 프로필 화면에서 메시지를 보내고나서 Rooms로 돌아올때 prev 데이터가 없어져 key 중복이 일어나지 않음.
        cache.evict({ id: "ROOT_QUERY", fieldName: "seeRooms" });
      },
    });
  };

  const [followUser, { loading: followLoading }] = useMutation(
    FOLLOWUSER_MUTATION,
    {
      variables: {
        userName,
      },
      update: (cache, result) => {
        const {
          data: {
            followUser: { ok },
          },
        } = result;
        if (!ok) return;
        cache.modify({
          id: `User:${userName}`,
          fields: {
            totalFollowers: (prev) => prev + 1,
            isFollowing: () => true,
          },
        });
        cache.modify({
          id: `User:${loggedInUser.data?.me?.userName}`,
          fields: {
            totalFollowing: (prev) => prev + 1,
          },
        });
        isChangedFollowVar(true);
      },
    }
  );

  const [unFollowUser, { loading: unFollowLoading }] = useMutation(
    UNFOLLOWUSER_MUTATION,
    {
      variables: {
        userName,
      },
      update: (cache, result) => {
        const {
          data: {
            unfollowUser: { ok },
          },
        } = result;
        if (!ok) return;
        cache.modify({
          id: `User:${userName}`,
          fields: {
            totalFollowers: (prev) => prev - 1,
            isFollowing: () => false,
          },
        });
        cache.modify({
          id: `User:${loggedInUser.data?.me?.userName}`,
          fields: {
            totalFollowing: (prev) => prev - 1,
          },
        });
        cache.evict({ id: "ROOT_QUERY", fieldName: "seeFollowing" });
        isChangedFollowVar(true);
      },
    }
  );

  return (
    <CS.Container>
      {isMe ? (
        <Shared.ButtonWithText
          text="Edit Profile"
          onPress={() => profileScreenNavigation.navigate("EditProfile")}
        />
      ) : (
        <>
          {isFollowing ? (
            <>
              <Shared.ButtonWithText
                text="Following"
                loading={unFollowLoading}
                disabled={unFollowLoading}
                onPress={() => unFollowUser()}
              />
              <View style={{ width: 10 }}></View>
              <Shared.ButtonWithText
                text="Hello~ 👋"
                loading={sendingMessage}
                disabled={sendingMessage}
                onPress={() => sendMessage()}
              />
            </>
          ) : (
            <Shared.ButtonWithText
              text="Follow"
              loading={followLoading}
              disabled={followLoading}
              onPress={() => followUser()}
            />
          )}
        </>
      )}
    </CS.Container>
  );
};

export default ProfileActions;
