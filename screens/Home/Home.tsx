import React from "react";
import Shared from "../../Components";
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
} from "../../@types/navigation/unAuth";

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const Home: React.FC<Props> = ({ navigation, route }) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <Shared.CenterView>
      <Shared.Logo maxWidth={"50%"} />
      <Shared.ButtonWithText
        disabled={false}
        onPress={goToCreateAccount}
        text={"Create New Account"}
      />
      <Shared.LinkWithText onPress={goToLogin} text={"Login"} />
    </Shared.CenterView>
  );
};

export default Home;
