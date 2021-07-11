import React, { useEffect } from "react";
import { Container } from "./styles";
import Shared from "@Components";
import {
  ProfileScreenNavigationProp,
  ProfileScreenRouteProp,
} from "types/navigation/auth";

interface IProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

const Profile: React.FC<IProps> = ({ navigation, route }) => {
  useEffect(() => {
    if (route?.params?.userName)
      navigation.setOptions({
        title: `${route?.params?.userName}'s Profile`,
      });
  }, []);
  return (
    <Container>
      <Shared.AccentMessage type="info" message="Profile Screen" />
    </Container>
  );
};

export default Profile;
