import React from "react";
import * as CS from "./styles";
import { seeRoom_seeRoom_messages } from "types/__generated__/seeRoom";
import { Text } from "react-native";

interface IProps {
  message: seeRoom_seeRoom_messages;
  isMine: boolean;
}

const MessageItem: React.FC<IProps> = ({ message, isMine }) => {
  const {
    text,
    user: { avatar, userName },
  } = message;

  return (
    <CS.Container isMine={isMine}>
      <CS.AvatarContainer isMine={isMine}>
        <CS.Avatar source={{ uri: avatar ?? undefined }} />
      </CS.AvatarContainer>
      <CS.FlexContainer isMine={isMine}>
        <CS.Username isMine={isMine}>{userName}</CS.Username>
        <CS.MessageContainer isMine={isMine}>
          <CS.MessageBalloon isMine={isMine}>
            <CS.Message>{text}</CS.Message>
          </CS.MessageBalloon>
          <CS.ReadText>읽음</CS.ReadText>
        </CS.MessageContainer>
        <CS.TimeText isMine={isMine}>5분 전</CS.TimeText>
      </CS.FlexContainer>
    </CS.Container>
  );
};

export default MessageItem;
