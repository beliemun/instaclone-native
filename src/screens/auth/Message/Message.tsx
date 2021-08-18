import React from "react";
import { Container } from "./styles";
import Shared from "@Components";

const Message: React.FC = () => {
  return (
    <Container>
      <Shared.AccentMessage type="info" message="Message Screen" />
    </Container>
  );
};

export default Message;
