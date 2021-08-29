import React from "react";
import * as CS from "./styles";
import useUser from "~/hooks/useUser";
import { seeRooms_seeRooms } from "types/__generated__/seeRooms";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageStackParamList } from "types/navigation/auth";

interface IProps {
  room: seeRooms_seeRooms;
}

const RoomItem: React.FC<IProps> = ({ room }) => {
  const { id, lastMessage, unreadTotal, users } = room;
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
          {unreadTotal > 0 ? (
            <CS.UnreadDot>
              <CS.UnreadText>
                {unreadTotal > 9 ? "9+" : unreadTotal}
              </CS.UnreadText>
            </CS.UnreadDot>
          ) : null}
          <CS.LastMessage unreadTotal={unreadTotal}>
            {lastMessage?.text}
          </CS.LastMessage>
        </CS.MessageContainter>
      </CS.Content>
    </CS.Container>
  );
};

export default RoomItem;
