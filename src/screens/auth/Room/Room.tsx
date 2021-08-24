import React from "react";
import * as CS from "./styles";
import Shared from "@Components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageStackParamList } from "types/navigation/auth";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { seeRoom } from "types/__generated__/seeRoom";
import { SEE_ROOM_QUERY } from "~/common/queries";

const Room: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<MessageStackParamList>>();
  const {
    params: { id, target },
  } = useRoute<RouteProp<MessageStackParamList, "Room">>();
  const { data, loading } = useQuery<seeRoom>(SEE_ROOM_QUERY, {
    variables: {
      id,
    },
  });
  console.log(data);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: target?.userName,
      headerBackTitleVisible: false,
    });
  }, []);

  return (
    <CS.Container>
      <Shared.AccentMessage type="info" message="Room Screen" />
    </CS.Container>
  );
};

export default Room;
