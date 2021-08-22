import React, { useState, useEffect } from "react";
import * as CS from "./styles";
import Shared from "@Components";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "types/navigation/auth";

const UploadPhoto: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, []);

  const HeaderRight = () => (
    <CS.HeaderRight onPress={() => navigation.navigate("UploadPhoto")}>
      <CS.HeaderRightText>Upload</CS.HeaderRightText>
    </CS.HeaderRight>
  );

  return <CS.Container></CS.Container>;
};

export default UploadPhoto;
