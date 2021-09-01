import React from "react";
import * as CS from "./styles";
import Shared from "@Components";
import { seePhotoComments_seePhotoComments } from "types/__generated__/seePhotoComments";
import { useNavigation } from "@react-navigation/core";
import captionRender from "~/common/captionRender";
import { FeedScreenNavigationProp } from "types/navigation/auth";

const CommentItem: React.FC<seePhotoComments_seePhotoComments> = ({
  user,
  text,
}) => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const { userName, avatar } = user;
  return (
    <CS.Container>
      <CS.AvatarContainer
        onPress={() => {
          navigation.navigate("Profile", { userName });
        }}
      >
        <CS.Avatar source={{ uri: avatar ?? undefined }} />
      </CS.AvatarContainer>

      <CS.CaptionContainer>
        <Shared.Link
          onPress={() =>
            navigation.navigate("Profile", {
              userName,
            })
          }
        >
          <CS.Username>{userName}</CS.Username>
        </Shared.Link>
        {captionRender(text)}
      </CS.CaptionContainer>
    </CS.Container>
  );
};

export default CommentItem;
