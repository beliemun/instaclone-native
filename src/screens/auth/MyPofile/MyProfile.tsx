import React, { useEffect } from "react";
import { Container } from "./styles";
import Shared from "@Components";
import { logUserOut } from "src/apollo";
import {
  MyProfileScreenNavigationProp,
  MyProfileScreenRouteProp,
} from "~/../@types/navigation/auth";
import useLoggedInUser from "~/hooks/useLoggedInUser";

interface IProps {
  navigation: MyProfileScreenNavigationProp;
  route: MyProfileScreenRouteProp;
}

const MyProfile: React.FC<IProps> = ({ navigation, route }) => {
  const { data } = useLoggedInUser();
  useEffect(() => {
    if (data?.me?.userName)
      navigation.setOptions({
        title: `${data?.me?.userName}'s Profile`,
      });
  }, []);

  return (
    <Container>
      <Shared.AccentMessage type="info" message={`My Profile`} />
    </Container>
  );
};

export default MyProfile;
