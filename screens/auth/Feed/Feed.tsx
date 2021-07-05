import React from "react";
import { Container } from "./styles";
import Shared from "../../../Components";
import { logUserOut } from "../../../apollo";
import {
  FeedScreenNavigationProp,
  FeedScreenRouteProp,
} from "../../../@types/navigation/auth";

interface IProps {
  navigation: FeedScreenNavigationProp;
  route: FeedScreenRouteProp;
}

const Feed: React.FC<IProps> = ({ navigation, route }) => {
  return (
    <Container>
      <Shared.ButtonWithText
        text="Photo"
        onPress={() => navigation.navigate("Photo")}
        loading={false}
        disabled={false}
      />
      <Shared.ButtonWithText
        text="Logout"
        onPress={() => logUserOut()}
        loading={false}
        disabled={false}
      />
    </Container>
  );
};

export default Feed;
