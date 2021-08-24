import React from "react";
import * as CS from "./styles";
import Shared from "@Components";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageStackParamList } from "types/navigation/auth";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const Rooms: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<MessageStackParamList>>();

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
    <CS.Container>
      <Shared.AccentMessage type="info" message="Rooms Screen" />
    </CS.Container>
  );
};

export default Rooms;
