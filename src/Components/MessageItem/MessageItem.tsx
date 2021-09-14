import React from "react";
import * as CS from "./styles";
import { seeRoom_seeRoom_messages } from "types/__generated__/seeRoom";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "types/navigation/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { getMomentFromNow } from "~/common/moment";

interface IProps {
  message: seeRoom_seeRoom_messages;
  isMine: boolean;
  read: boolean;
  createdAt: number;
}
const MessageItem: React.FC<IProps> = ({
  message,
  isMine,
  createdAt,
  read,
}) => {
  const navigatoin = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const {
    text,
    user: { avatar, userName },
  } = message;

  return (
    <CS.Container isMine={isMine}>
      <CS.AvatarContainer
        isMine={isMine}
        onPress={() => navigatoin.navigate("Profile", { userName })}
      >
        <CS.Avatar source={{ uri: avatar ?? undefined }} />
      </CS.AvatarContainer>
      <CS.FlexContainer isMine={isMine}>
        <CS.Username isMine={isMine}>{userName}</CS.Username>
        <CS.MessageContainer isMine={isMine}>
          <CS.MessageBalloon isMine={isMine}>
            <CS.Message>{text}</CS.Message>
          </CS.MessageBalloon>
          {isMine && <CS.ReadText>{read ? "읽음" : ""}</CS.ReadText>}
        </CS.MessageContainer>
        <CS.CreatedAtText isMine={isMine}>
          {getMomentFromNow(createdAt)}
        </CS.CreatedAtText>
      </CS.FlexContainer>
    </CS.Container>
  );
};

export default MessageItem;
