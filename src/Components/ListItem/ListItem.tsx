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

const ListItem: React.FC<seePhotoLikes_seePhotoLikes> = ({
  id,
  userName,
  avatar,
  isFollowing,
  isMe,
}) => {
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
          id: `User:${id}`,
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
      <Link onPress={() => navigation.navigate("Profile", { id, userName })}>
        <AvatarContainer>
          <Avatar source={{ uri: avatar ?? undefined }} />
        </AvatarContainer>
        <Username>{userName}</Username>
      </Link>
      {!isMe ? (
        isFollowing ? (
          <Following>Following</Following>
        ) : (
          <Shared.ButtonWithText
            onPress={() => follow(userName)}
            text="Follow"
            loading={loading}
          />
        )
      ) : null}
    </Container>
  );
};

export default ListItem;
