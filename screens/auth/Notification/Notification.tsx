import React from "react";
import { Container } from "./styles";
import Shared from "../../../Components";
import { logUserOut } from "../../../apollo";
import {
  NotificationScreenNavigationProp,
  NotificationScreenRouteProp,
} from "../../../@types/navigation/auth";

interface IProps {
  navigation: NotificationScreenNavigationProp;
  route: NotificationScreenRouteProp;
}

const Notification: React.FC<IProps> = ({ navigation, route }) => {
  return (
    <Container>
      <Shared.AccentMessage type="info" message="Notification Screen" />
      <Shared.ButtonWithText
        text="Logout"
        onPress={() => logUserOut()}
        loading={false}
        disabled={false}
      />
    </Container>
  );
};

export default Notification;
