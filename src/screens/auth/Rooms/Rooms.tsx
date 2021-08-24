import React from "react";
import * as CS from "./styles";
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
import { View } from "react-native";

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
      <CS.Container>
        {data?.seeRooms ? (
          <FlatList
            data={data?.seeRooms}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(item) => <RoomItem item={item.item} />}
            ItemSeparatorComponent={() => <View style={{ height: 3 }}></View>}
          />
        ) : null}
      </CS.Container>
    </Shared.LoadingLayout>
  );
};

export default Rooms;
