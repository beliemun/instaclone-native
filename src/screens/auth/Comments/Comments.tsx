import React from "react";
import { Container } from "./styles";
import Shared from "@Components";
import { logUserOut } from "src/apollo";

const Comments: React.FC = () => {
  return (
    <Container>
      <Shared.AccentMessage type="info" message="Comments Screen" />
    </Container>
  );
};

export default Comments;
