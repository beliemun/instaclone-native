import React from "react";
import { Container } from "./styles";
import Shared from "../../../Components";
import { logUserOut } from "../../../apollo";

const Comments: React.FC = () => {
  return (
    <Container>
      <Shared.AccentMessage type="info" message="Comments Screen" />
      <Shared.ButtonWithText
        text="Logout"
        onPress={() => logUserOut()}
        loading={false}
        disabled={false}
      />
    </Container>
  );
};

export default Comments;
