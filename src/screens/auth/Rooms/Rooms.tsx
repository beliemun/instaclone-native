import React, { useRef, useState } from "react";
import Shared from "@Components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  AuthStackParamList,
  MessageStackParamList,
} from "types/navigation/auth";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ApolloQueryResult,
  gql,
  useApolloClient,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import { SEE_ROOMS_QUERY } from "~/common/queries";
import { FlatList } from "react-native-gesture-handler";
import RoomItem from "~/Components/RoomItem";
import { NEW_MESSAGE_UPDATE } from "~/common/subscription";
import { seeRoom_seeRoom } from "types/__generated__/seeRoom";
import { takeVar } from "~/apollo";
import { seeProfile_seeProfile } from "types/__generated__/seeProfile";
import { seeRooms, seeRooms_seeRooms } from "types/__generated__/seeRooms";

interface IProps {
  id?: number;
  target?: seeProfile_seeProfile;
}

const Rooms: React.FC<IProps> = ({ id, target }) => {
  const navigation =
    useNavigation<StackNavigationProp<MessageStackParamList>>();
  const take = useReactiveVar(takeVar);
  const { data, loading, subscribeToMore, refetch, fetchMore } =
    useQuery(SEE_ROOMS_QUERY);
  const { cache } = useApolloClient();
  const [subscribing, setSubcribing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFetching = useRef(false);

  useEffect(() => {
    if (id && target) {
      navigation.navigate("Room", { id, target });
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Rooms",
      headerBackTitleVisible: false,
      headerBackImage: ({ tintColor }) => (
        <Ionicons name={"close"} color={tintColor} size={28} />
      ),
    });
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    cache.evict({ id: "ROOT_QUERY", fieldName: "seeRooms" });
    await refetch();
    setRefreshing(false);
  };

  //Rooms 혹은 Room 화면 외에 있을 때 Data 변경 감지를 위해 화면에 들어올 때마다 refetch.
  useEffect(() => {
    // 채팅방 외 화면에서 메시지를 받을 경우 data를 갱신
    // console.log("refetch()");
    // if (loading || refreshing || isFetching.current) return;
    // refresh();
  }, [data?.seeRooms]);

  // Rooms 혹은 Room 화면에 있을 때 Data 변경 감지를 위한 Subscription.
  useEffect(() => {
    // data?.seeRooms 조건을 넣어주지 않으면 배열이 비어있기 때문에 subscribe 되는 Room이 없다.
    if (data?.seeRooms && !subscribing) {
      setSubcribing(true);
      data?.seeRooms.map((room: seeRoom_seeRoom) => {
        // sendMessageUpdate : Rooms에 있는 상태에서 누가 메시지를 보낸 경우 Rooms 업데이트
        subscribeToMore({
          document: NEW_MESSAGE_UPDATE,
          variables: {
            id: room.id,
          },
          updateQuery: (prev, { subscriptionData: { data } }) => {
            const { newMessageUpdate: message } = data;
            const incomingMessage = cache.writeFragment({
              fragment: gql`
                fragment NewMessageInRooms on Message {
                  id
                  text
                  user {
                    id
                    avatar
                    userName
                  }
                  read
                  createdAt
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
          style={{ width: "100%" }}
          data={data?.seeRooms}
          renderItem={({ item: room }) => <RoomItem room={room} />}
          keyExtractor={({ id }) => id.toString()}
          ItemSeparatorComponent={() => <Shared.ItemSeparator height={1} />}
        />
      ) : (
        <></>
      )}
    </Shared.LoadingLayout>
  );
};

export default Rooms;
