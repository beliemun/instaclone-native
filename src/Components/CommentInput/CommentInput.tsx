import React, { useState } from "react";
import { Container, Input, AvatarContainer, Avatar } from "./styles";
import useUser from "~/hooks/useUser";
import { gql, useMutation } from "@apollo/client";
import { COMMENT_FRAGMENT } from "~/common/fragments";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $text: String!) {
    createComment(photoId: $photoId, text: $text) {
      ok
      error
      id
    }
  }
`;

interface IProp {
  photoId: number;
}

const CommentInput: React.FC<IProp> = ({ photoId }) => {
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
            latestComments: () => newCache,
          },
        });
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
