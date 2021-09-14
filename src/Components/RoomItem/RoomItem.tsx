import React from "react";
import * as CS from "./styles";
import useUser from "~/hooks/useUser";
import { seeRooms_seeRooms } from "types/__generated__/seeRooms";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageStackParamList } from "types/navigation/auth";
import { getMomentFromNow } from "~/common/moment";

interface IProps {
  room: seeRooms_seeRooms;
}

const RoomItem: React.FC<IProps> = ({ room }) => {
  const { id, lastMessage, unreadTotal, users, updatedAt } = room;
  const navigation =
    useNavigation<StackNavigationProp<MessageStackParamList>>();
  const loggedInUser = useUser();
  const target = users?.find(
    (user) => user?.userName !== loggedInUser.data?.me?.userName
  );

  return (
    <CS.Container onPress={() => navigation.navigate("Room", { id, target })}>
      <CS.AvatarContainer>
        <CS.Avatar source={{ uri: target?.avatar ?? undefined }} />
      </CS.AvatarContainer>
      <CS.Content>
        <CS.Username>{target?.userName}</CS.Username>

        <CS.MessageContainter>
          {unreadTotal > 0 && <CS.UnreadText>{unreadTotal}</CS.UnreadText>}
          {lastMessage && (
            <CS.LastMessage unreadTotal={unreadTotal}>
              {lastMessage.text.length > 30
                ? lastMessage.text.slice(0, 30) + "..."
                : lastMessage.text}
            </CS.LastMessage>
          )}
        </CS.MessageContainter>
      </CS.Content>
      <CS.UpdatedAtText>{getMomentFromNow(Number(updatedAt))}</CS.UpdatedAtText>
    </CS.Container>
  );
};

export default RoomItem;
