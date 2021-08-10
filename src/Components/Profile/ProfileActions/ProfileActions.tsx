import React from "react";
import * as CS from "./styles";
import Shared from "@Components";
import useUser from "~/hooks/useUser";
import { View } from "react-native";
import { useMutation } from "@apollo/client";
import { FOLLOWUSER_MUTATION, UNFOLLOWUSER_MUTATION } from "~/common/mutations";

interface IProps {
  userName: string;
  isMe: boolean;
  isFollowing: boolean;
}

const ProfileActions: React.FC<IProps> = ({ userName, isMe, isFollowing }) => {
  const loggedInUser = useUser();

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
      },
    }
  );

  return (
    <CS.Container>
      {isMe ? (
        <Shared.ButtonWithText text="Edit Profile" />
      ) : (
        <>
          {isFollowing ? (
            <Shared.ButtonWithText
              text="Following"
              loading={unFollowLoading}
              disabled={unFollowLoading}
              onPress={() => unFollowUser()}
            />
          ) : (
            <Shared.ButtonWithText
              text="Follow"
              loading={followLoading}
              disabled={followLoading}
              onPress={() => followUser()}
            />
          )}

          <View style={{ width: 10 }}></View>
          <Shared.ButtonWithText text="Message" />
        </>
      )}
    </CS.Container>
  );
};

export default ProfileActions;
