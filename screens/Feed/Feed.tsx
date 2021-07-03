import React from "react";
import { Container } from "./styles";
import Shared from "../../Components";
import { logUserOut } from "../../apollo";

const Feed: React.FC = () => {
  return (
    <Container>
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
