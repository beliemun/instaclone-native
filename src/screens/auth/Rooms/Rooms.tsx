import React from "react";
import Shared from "@Components";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageStackParamList } from "types/navigation/auth";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { SEE_ROOMS_QUERY } from "~/common/queries";
import { seeRooms } from "types/__generated__/seeRooms";
import { FlatList } from "react-native-gesture-handler";
import RoomItem from "~/Components/RoomItem";

const Rooms: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<MessageStackParamList>>();
  const { data, loading } = useQuery<seeRooms>(SEE_ROOMS_QUERY);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Rooms",
      headerBackTitleVisible: false,
      headerBackImage: ({ tintColor }) => (
        <Ionicons name={"close"} color={tintColor} size={28} />
      ),
    });
  }, []);

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
