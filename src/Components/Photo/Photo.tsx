import React from "react";
import { useWindowDimensions } from "react-native";
import * as CS from "./styles";
import Shared from "@Components";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "src/common/theme";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { FeedScreenNavigationProp } from "~/../@types/navigation/auth";
import captionRender from "~/common/captionRender";
import CommentInput from "~/Components/CommentInput";
import { TOGGLE_LIKE_MUTATION } from "~/common/mutations";
import { seeFeed_seeFeed } from "~/../@types/__generated__/seeFeed";
import { seePhoto_seePhoto } from "types/__generated__/seePhoto";

interface IProps {
  photo: seeFeed_seeFeed | seePhoto_seePhoto;
}

const Photo: React.FC<IProps> = ({ photo }) => {
  const {
    id,
    user,
    file,
    caption,
    likeCount,
    commentCount,
    isLiked,
    comments,
  } = photo;

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
          id: `FeedItem:${id}`,
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
    <CS.Container width={width}>
      <CS.Header
        onPress={() =>
          navigation.navigate("Profile", {
            user,
          })
        }
      >
        <CS.AvatarContainer>
          <CS.Avatar source={{ uri: user?.avatar ?? undefined }} />
        </CS.AvatarContainer>
        <CS.Username>{user?.userName}</CS.Username>
      </CS.Header>
      <CS.File source={{ uri: file }} width={width} height={width} />
      <CS.Footer>
        <CS.Actions>
          <CS.Action disabled={loading} onPress={() => toggleLikeMutation()}>
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
          </CS.Action>
          <CS.Action
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
          </CS.Action>
        </CS.Actions>
        {likeCount !== 0 && (
          <Shared.Link
            onPress={() => navigation.navigate("Likes", { photoId: id })}
          >
            <CS.Likes>
              {likeCount}
              {likeCount === 1 ? " like" : " likes"}
            </CS.Likes>
          </Shared.Link>
        )}
        {caption && (
          <CS.Caption>
            <Shared.Link
              onPress={() =>
                navigation.navigate("Profile", {
                  user,
                })
              }
            >
              <CS.Username>{user.userName}</CS.Username>
            </Shared.Link>
            {captionRender(caption)}
          </CS.Caption>
        )}
        {(commentCount == 1 || commentCount == 2) && (
          <Shared.Link
            onPress={() =>
              navigation.navigate("Comments", { photoId: id, user, caption })
            }
          >
            <CS.CommentCount>
              {commentCount}
              {commentCount === 1 ? " comment" : " comments"}
            </CS.CommentCount>
          </Shared.Link>
        )}
        {commentCount > 2 && (
          <Shared.Link
            onPress={() =>
              navigation.navigate("Comments", { photoId: id, user, caption })
            }
          >
            <CS.CommentCount>{`View all ${commentCount} comments`}</CS.CommentCount>
          </Shared.Link>
        )}
        {comments?.length != 0 &&
          comments?.map((comment, index) => (
            <React.Fragment key={comment.id}>
              {index < 2 && (
                <CS.Comment key={comment.id}>
                  <Shared.Link
                    onPress={() =>
                      navigation.navigate("Profile", {
                        user: comment.user,
                      })
                    }
                  >
                    <CS.Username>{comment.user.userName}</CS.Username>
                  </Shared.Link>
                  {captionRender(comment.text)}
                </CS.Comment>
              )}
            </React.Fragment>
          ))}
      </CS.Footer>
      <CommentInput photoId={id} />
    </CS.Container>
  );
};

export default Photo;
