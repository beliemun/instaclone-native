import React from "react";
import {
  Container,
  AvatarContainer,
  Avatar,
  CaptionContainer,
  Username,
  Link,
} from "./styles";
import Shared from "@Components";
import { seePhotoComments_seePhotoComments } from "types/__generated__/seePhotoComments";
import { useNavigation } from "@react-navigation/core";
import { CommentsScreenNavigationProp } from "types/navigation/auth";
import captionRender from "~/common/captionRender";

const CommentItem: React.FC<seePhotoComments_seePhotoComments> = ({
  user: { id, userName, avatar },
  text,
}) => {
  const navigation = useNavigation<CommentsScreenNavigationProp>();

  return (
    <Container>
      <Link onPress={() => navigation.navigate("Profile", { id, userName })}>
        <AvatarContainer>
          <Avatar source={{ uri: avatar ?? undefined }} />
        </AvatarContainer>
      </Link>
      <CaptionContainer>
        <Shared.Link
          onPress={() =>
            navigation.navigate("Profile", {
              id,
              userName,
            })
          }
        >
          <Username>{userName}</Username>
        </Shared.Link>
        {captionRender(text)}
      </CaptionContainer>
    </Container>
  );
};

export default CommentItem;
