import React, { useState } from "react";
import { Container, Input, AvatarContainer, Avatar } from "./styles";
import useUser from "~/hooks/useUser";
import { useMutation } from "@apollo/client";
import { COMMENT_FRAGMENT } from "~/common/fragments";
import { useRoute } from "@react-navigation/native";
import { CommentsScreenRouteProp } from "types/navigation/auth";
import { CREATE_COMMENT_MUTATION } from "~/common/mutations";

interface IProp {
  photoId: number;
}

const CommentInput: React.FC<IProp> = ({ photoId }) => {
  const user = useUser();
  const route = useRoute<CommentsScreenRouteProp>();
  const [text, setText] = useState("");
  const { name } = useRoute();

  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      photoId,
      text,
    },
    update: (cache, result) => {
      const {
        data: {
          createComment: { ok, id },
        },
      } = result;
      if (ok && user.data?.me) {
        const newComment = {
          __typename: "Comment",
          id,
          text,
          isMine: true,
          createAt: Date.now(),
          user: { ...user.data.me },
        };
        const newCache = cache.writeFragment({
          id: `Comment:${id}`,
          fragment: COMMENT_FRAGMENT,
          fragmentName: "CommentFragment",
          data: newComment,
        });
        if (name == "Feed") {
          cache.modify({
            id: `Photo:${photoId}`,
            fields: {
              comments: () => newCache,
            },
          });
        } else if (name == "Comments") {
          console.log("Comments Test");
          // TODO: Comment 화면에서 입력 가능해야 함
        }
      }
    },
    // refetchQueries: () => [
    //   {
    //     query: SEE_PHOTO_COMMENTS_QUERY,
    //     variables: {
    //       id: route?.params?.photoId,
    //       offset: 0,
    //     },
    //   },
    // ],
  });

  const onSubmit = () => {
    if (text == "" || loading) {
      return;
    }
    createComment({ variables: { photoId, text } });
    setText("");
  };

  return (
    <Container>
      <AvatarContainer>
        <Avatar source={{ uri: user.data?.me?.avatar ?? undefined }} />
      </AvatarContainer>
      <Input
        placeholder="Write a comment.."
        onSubmitEditing={() => onSubmit()}
        onChangeText={(text) => setText(text)}
        autoCorrect={false}
        value={text}
      />
    </Container>
  );
};

export default CommentInput;
