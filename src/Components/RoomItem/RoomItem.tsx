import React from "react";
import * as CS from "./styles";
import Shared from "@Components";
import useUser from "~/hooks/useUser";
import { seeRooms_seeRooms } from "types/__generated__/seeRooms";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageStackParamList } from "types/navigation/auth";

interface IProps {
  item: seeRooms_seeRooms;
}

const RoomItem: React.FC<IProps> = ({ item }) => {
  const navigation =
    useNavigation<StackNavigationProp<MessageStackParamList>>();
  const loggedInUser = useUser();
  const target = item.users?.find(
    (user) => user?.userName !== loggedInUser.data?.me?.userName
  );

  return (
    <CS.Container
      onPress={() => navigation.navigate("Room", { id: item.id, target })}
    >
      <CS.AvatarContainer>
        <CS.Avatar source={{ uri: target?.avatar ?? undefined }} />
      </CS.AvatarContainer>
      <CS.Content>
        <CS.Username>{target?.userName}</CS.Username>
        <CS.MessageContainter>
          {item.unreadTotal > 0 ? (
            <CS.UnreadDot>
              <CS.UnreadText>
                {item.unreadTotal > 9 ? "9+" : item.unreadTotal}
              </CS.UnreadText>
            </CS.UnreadDot>
          ) : null}
          <CS.LastMessage unreadTotal={item.unreadTotal}>
            {item.lastMessage?.text}
          </CS.LastMessage>
        </CS.MessageContainter>
      </CS.Content>
    </CS.Container>
  );
};

export default RoomItem;
