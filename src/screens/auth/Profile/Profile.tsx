import React from "react";
import { Container } from "./styles";
import Shared from "@Components";
import { logUserOut } from "src/apollo";
import {
  MyProfileScreenNavigationProp,
  MyProfileScreenRouteProp,
} from "~/../@types/navigation/auth";

interface IProps {
  navigation: MyProfileScreenNavigationProp;
  route: MyProfileScreenRouteProp;
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
