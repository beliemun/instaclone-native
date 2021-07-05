import React from "react";
import { Container } from "./styles";
import Shared from "../../../Components";
import { logUserOut } from "../../../apollo";
import {
  ProfileAuthStackNavigationProp,
  ProfileAuthStackRouteProp,
} from "../../../@types/navigation/authStack";

interface IProps {
  navigation: ProfileAuthStackNavigationProp;
  route: ProfileAuthStackRouteProp;
}

const Profile: React.FC<IProps> = ({ navigation, route }) => {
  return (
    <Container>
      <Shared.AccentMessage type="info" message="Profile Screen" />
      <Shared.ButtonWithText
        text="Logout"
        onPress={() => logUserOut()}
        loading={false}
        disabled={false}
      />
    </Container>
  );
};

export default Profile;
