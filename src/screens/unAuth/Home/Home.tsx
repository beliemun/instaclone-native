import React from "react";
import Shared from "@Components";
import { InputContainer } from "./styles";
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
} from "~/../@types/navigation/unAuth";

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
          disabled={false}
          loading={false}
          onPress={goToCreateAccount}
        />
      </InputContainer>
      <Shared.LinkWithText onPress={goToLogin} text={"Login"} />
    </Shared.CenterView>
  );
};

export default Home;
