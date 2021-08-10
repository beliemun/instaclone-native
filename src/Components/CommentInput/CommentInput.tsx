import React, { useState } from "react";
import { Container, Input, AvatarContainer, Avatar } from "./styles";
import useUser from "~/hooks/useUser";
import { useMutation } from "@apollo/client";
import { COMMENT_FRAGMENT } from "~/common/fragments";
import { useRoute } from "@react-navigation/native";
import { CommentsScreenRouteProp } from "types/navigation/auth";
import { CREATE_COMMENT_MUTATION } from "~/common/mutations";
import { CommentInputType } from "types/common";

interface IProp {
  photoId: number;
  refresh: () => Promise<void> | null;
  type: CommentInputType;
}

const CommentInput: React.FC<IProp> = ({ photoId, refresh, type }) => {
  const user = useUser();
  const [text, setText] = useState("");

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
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            comments: (prev) => {
              return [newCache, ...prev].slice(0, 2);
            },
          },
        });
        if (type === "Comments") {
          refresh();
        }
      }
    },
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
