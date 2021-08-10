import React from "react";
import {
  Container,
  AvatarContainer,
  Avatar,
  Username,
  Link,
  Following,
} from "./styles";
import Shared from "@Components";
import { seePhotoLikes_seePhotoLikes } from "types/__generated__/seePhotoLikes";
import { LikesScreenNavigationProp } from "types/navigation/auth";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { FOLLOWUSER_MUTATION } from "~/common/mutations";
interface IProps {
  user: seePhotoLikes_seePhotoLikes;
}
const ListItem: React.FC<IProps> = ({ user }) => {
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
          id: `User:${user.id}`,
          fields: {
            isFollowing(prev) {
              return !prev;
            },
          },
        });
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
    <Container>
      <Link onPress={() => navigation.navigate("Profile", { user })}>
        <AvatarContainer>
          <Avatar source={{ uri: user.avatar ?? undefined }} />
        </AvatarContainer>
        <Username>{user.userName}</Username>
      </Link>
      {!user.isMe ? (
        user.isFollowing ? (
          <Following>Following</Following>
        ) : (
          <Shared.ButtonWithText
            onPress={() => follow(user.userName)}
            text="Follow"
            loading={loading}
          />
        )
      ) : null}
    </Container>
  );
};

export default ListItem;
