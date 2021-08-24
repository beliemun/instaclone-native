import React from "react";
import * as CS from "./styles";
import Shared from "@Components";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageStackParamList } from "types/navigation/auth";
import { useEffect } from "react";

const Room: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<MessageStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Room",
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
