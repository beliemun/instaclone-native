import React from "react";
import Shared from "@Components";
import * as CS from "./styles";
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
      <CS.Container>
        <CS.ButtonContainer>
          <Shared.ButtonWithText
            text={"Create New Account"}
            onPress={goToCreateAccount}
          />
        </CS.ButtonContainer>
        <CS.ButtonContainer>
          <Shared.LinkWithText onPress={goToLogin} text={"Login"} />
        </CS.ButtonContainer>
      </CS.Container>
    </Shared.CenterView>
  );
};

export default Home;
