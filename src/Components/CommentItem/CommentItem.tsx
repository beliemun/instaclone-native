import React from "react";
import {
  Container,
  AvatarContainer,
  Avatar,
  CaptionContainer,
  Username,
} from "./styles";
import Shared from "@Components";
import { seePhotoComments_seePhotoComments } from "types/__generated__/seePhotoComments";
import { useNavigation } from "@react-navigation/core";
import { CommentsScreenNavigationProp } from "types/navigation/auth";
import captionRender from "~/common/captionRender";

const CommentItem: React.FC<seePhotoComments_seePhotoComments> = ({
  user,
  text,
}) => {
  const navigation = useNavigation<CommentsScreenNavigationProp>();
  const { userName, avatar } = user;
  return (
    <Container>
      <Shared.Link onPress={() => navigation.navigate("Profile", { user })}>
        <AvatarContainer>
          <Avatar source={{ uri: avatar ?? undefined }} />
        </AvatarContainer>
      </Shared.Link>
      <CaptionContainer>
        <Shared.Link
          onPress={() =>
            navigation.navigate("Profile", {
              user,
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
