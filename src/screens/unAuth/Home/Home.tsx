import React from "react";
import Shared from "@Components";
import { InputContainer } from "./styles";
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
} from "~/../@types/navigation/unAuth";
import { View } from "react-native";

interface IProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const Home: React.FC<IProps> = ({ navigation, route }) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <Shared.CenterView>
      <Shared.Logo maxWidth={"50%"} />
      <InputContainer>
        <Shared.ButtonWithText
          text={"Create New Account"}
          isFullWidth={true}
          onPress={goToCreateAccount}
        />
      </InputContainer>
      <View style={{ margin: 10 }}>
        <Shared.LinkWithText onPress={goToLogin} text={"Login"} />
      </View>
    </Shared.CenterView>
  );
};

export default Home;
