import React, { useState } from "react";
import Shared from "@Components";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageStackParamList } from "types/navigation/auth";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { SEE_ROOMS_QUERY } from "~/common/queries";
import { seeRooms } from "types/__generated__/seeRooms";
import { FlatList } from "react-native-gesture-handler";
import RoomItem from "~/Components/RoomItem";
import { readMessageUpdate } from "types/__generated__/readMessageUpdate";
import { NEW_MESSAGE_UPDATE, READ_MESSAGE_UPDATE } from "~/common/subscription";
import { seeRoom_seeRoom } from "types/__generated__/seeRoom";

const Rooms: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<MessageStackParamList>>();
  const { data, loading, subscribeToMore } = useQuery(SEE_ROOMS_QUERY);
  const { cache } = useApolloClient();
  const [subscribing, setSubcribing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Rooms",
      headerBackTitleVisible: false,
      headerBackImage: ({ tintColor }) => (
        <Ionicons name={"close"} color={tintColor} size={28} />
      ),
    });
  }, []);

  useEffect(() => {
    // readMessageUpdate
    // data?.seeRoom 조건을 넣어주지 않으면 배열이 비어있기 때문에 subscribe 되는 Room이 없다.
    if (data?.seeRooms && !subscribing) {
      setSubcribing(true);
      data?.seeRooms.map((room: seeRoom_seeRoom) => {
        subscribeToMore({
          document: READ_MESSAGE_UPDATE,
          variables: {
            id: room.id,
          },
          updateQuery: (prev, { subscriptionData: { data } }) => {
            cache.modify({
              id: `Room:${room?.id}`,
              fields: {
                unreadTotal: () => 0,
              },
            });
          },
        });

        //sendMessageUpdate
        subscribeToMore({
          document: NEW_MESSAGE_UPDATE,
          variables: {
            id: room.id,
          },
          updateQuery: (prev, { subscriptionData: { data } }) => {
            const { newMessageUpdate: message } = data;
            const incomingMessage = cache.writeFragment({
              fragment: gql`
                fragment NewMessage on Message {
                  id
                  text
                  user {
                    id
                    avatar
                    userName
                  }
                  read
                }
              `,
              data: message,
            });
            cache.modify({
              id: `Room:${room.id}`,
              fields: {
                lastMessage: () => incomingMessage,
                unreadTotal: (prev) => prev + 1,
              },
            });
          },
        });
      });
    }
  }, [data?.seeRooms]);

  return (
    <Shared.LoadingLayout loading={loading}>
      {data?.seeRooms ? (
        <FlatList
          data={data?.seeRooms}
          renderItem={({ item: room }) => <RoomItem room={room} />}
          keyExtractor={({ id }) => id.toString()}
          ItemSeparatorComponent={() => <Shared.ItemSeparator height={1} />}
          style={{ width: "100%" }}
        />
      ) : (
        <></>
      )}
    </Shared.LoadingLayout>
  );
};

export default Rooms;
