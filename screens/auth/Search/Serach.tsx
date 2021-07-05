import React from "react";
import { Container } from "./styles";
import Shared from "../../../Components";
import { logUserOut } from "../../../apollo";
import {
  SearchScreenNavigationProp,
  SearchScreenRouteProp,
} from "../../../@types/navigation/auth";

interface IProps {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}

const Serach: React.FC<IProps> = ({ navigation, route }) => {
  return (
    <Container>
      <Shared.AccentMessage type="info" message="Serach Screen" />
      <Shared.ButtonWithText
        text="Logout"
        onPress={() => logUserOut()}
        loading={false}
        disabled={false}
      />
    </Container>
  );
};

export default Serach;
