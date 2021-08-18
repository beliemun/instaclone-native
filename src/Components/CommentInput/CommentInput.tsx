import React, { MutableRefObject, useState } from "react";
import { Container, Input, AvatarContainer, Avatar } from "./styles";
import useUser from "~/hooks/useUser";
import { useMutation } from "@apollo/client";
import { COMMENT_FRAGMENT } from "~/common/fragments";
import { CREATE_COMMENT_MUTATION } from "~/common/mutations";
import {
  SEE_FOLLOWING_QUERY,
  SEE_PHOTO_COMMENTS_QUERY,
} from "~/common/queries";
import { CommentInputType } from "types/common";

interface IProp {
  photoId: number;
  isFetching?: MutableRefObject<boolean>;
}

const CommentInput: React.FC<IProp> = ({ photoId, isFetching }) => {
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
        cache.evict({ id: "ROOT_QUERY", fieldName: "seePhotoComments" });
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seePhotoComments: (prev) => {
              return [newCache, ...prev];
            },
          },
        });
      }
    },
  });

  const onSubmit = () => {
    if (text == "" || loading || isFetching?.current) return;
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
