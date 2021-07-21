import React from "react";
import { useWindowDimensions, Text } from "react-native";
import { seeFeed_seeFeed } from "~/../@types/__generated__/seeFeed";
import {
  Container,
  Header,
  AvatarContainer,
  Avatar,
  Username,
  File,
  Actions,
  Action,
  Footer,
  Likes,
  Caption,
  CommentCount,
  Comment,
} from "./styles";
import Shared from "@Components";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "src/common/theme";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { FeedScreenNavigationProp } from "~/../@types/navigation/auth";
import captionRender from "~/common/captionRender";
import { seePhoto_seePhoto } from "types/__generated__/seePhoto";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

interface IProps {
  photo: seeFeed_seeFeed | seePhoto_seePhoto;
}

const Photo: React.FC<IProps> = ({ photo }) => {
  const { id, user, file, caption, likeCount, commentCount, isLiked } = photo;
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: (cache, result) => {
      const {
        data: {
          toggleLike: { ok },
        },
      } = result;
      if (ok) {
        cache.modify({
          id: `Photo:${id}`,
          fields: {
            isLiked(prev) {
              return !prev;
            },
            likeCount(prev) {
              return isLiked ? prev - 1 : prev + 1;
            },
          },
        });
      }
    },
  });

  return (
    <Container width={width}>
      <Header
        onPress={() =>
          navigation.navigate("Profile", {
            id: user.id,
            userName: user.userName,
          })
        }
      >
        <AvatarContainer>
          <Avatar source={{ uri: user.avatar ?? undefined }} />
        </AvatarContainer>
        <Username>{user.userName}</Username>
      </Header>
      <File source={{ uri: file }} width={width} height={width} />
      <Footer>
        <Actions>
          <Action disabled={loading} onPress={() => toggleLikeMutation()}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={
                isLiked
                  ? "tomato"
                  : colorScheme === "light"
                  ? lightTheme.color
                  : darkTheme.color
              }
              size={26}
            />
          </Action>
          <Action
            onPress={() =>
              navigation.navigate("Comments", { photoId: id, user, caption })
            }
          >
            <Ionicons
              name="chatbubble-outline"
              color={
                colorScheme === "light" ? lightTheme.color : darkTheme.color
              }
              size={26}
            />
          </Action>
          <Action>
            <Ionicons
              name="paper-plane-outline"
              color={
                colorScheme === "light" ? lightTheme.color : darkTheme.color
              }
              size={26}
            />
          </Action>
        </Actions>
        {likeCount !== 0 && (
          <Shared.Link
            onPress={() => navigation.navigate("Likes", { photoId: id })}
          >
            <Likes>
              {likeCount}
              {likeCount === 1 ? " like" : " likes"}
            </Likes>
          </Shared.Link>
        )}
        {caption && (
          <Caption>
            <Shared.Link
              onPress={() =>
                navigation.navigate("Profile", {
                  id: user.id,
                  userName: user.userName,
                })
              }
            >
              <Username>{user.userName}</Username>
            </Shared.Link>
            {captionRender(caption)}
          </Caption>
        )}
        {commentCount !== 0 && (
          <Shared.Link
            onPress={() =>
              navigation.navigate("Comments", { photoId: id, user, caption })
            }
          >
            <CommentCount>
              {commentCount}
              {commentCount === 1 ? " comment" : " comments"}
            </CommentCount>
          </Shared.Link>
        )}
      </Footer>
    </Container>
  );
};

export default Photo;
