import React from "react";
import * as CS from "./styles";
import Shared from "@Components";
import { LikesScreenNavigationProp } from "types/navigation/auth";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { FOLLOWUSER_MUTATION } from "~/common/mutations";
import useUser from "~/hooks/useUser";
import { isChangedFollowVar } from "~/apollo";

interface IUser {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

interface IProps {
  user: IUser;
}
const ListItem: React.FC<IProps> = ({ user }) => {
  const loggedInUser = useUser();
  const navigation = useNavigation<LikesScreenNavigationProp>();
  const [followUser, { loading }] = useMutation(FOLLOWUSER_MUTATION, {
    update: (cache, result) => {
      const {
        data: {
          followUser: { ok },
        },
      } = result;
      if (ok) {
        cache.modify({
          id: `User:${user.userName}`,
          fields: {
            totalFollowers: (prev) => prev + 1,
            isFollowing: (prev) => true,
          },
        });
        cache.modify({
          id: `User:${loggedInUser.data?.me?.userName}`,
          fields: {
            totalFollowing: (prev) => prev + 1,
          },
        });
        isChangedFollowVar(true);
      }
    },
  });
  const follow = (userName: string) =>
    followUser({
      variables: {
        userName,
      },
    });

  return (
    <CS.Container>
      <CS.Link
        onPress={() =>
          navigation.navigate("Profile", { userName: user.userName })
        }
      >
        <CS.AvatarContainer>
          <CS.Avatar source={{ uri: user.avatar ?? undefined }} />
        </CS.AvatarContainer>
        <CS.Username>{user.userName}</CS.Username>
      </CS.Link>
      {!user.isMe ? (
        user.isFollowing ? (
          <CS.Following>Following</CS.Following>
        ) : (
          <CS.ButtonContainer>
            <Shared.ButtonWithText
              onPress={() => follow(user.userName)}
              text="Follow"
              loading={loading}
              disabled={loading}
            />
          </CS.ButtonContainer>
        )
      ) : null}
    </CS.Container>
  );
};

export default ListItem;
