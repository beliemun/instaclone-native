import React from "react";
import { Container } from "./styles";
import Shared from "@Components";
import { logUserOut } from "src/apollo";

const Photo: React.FC = () => {
  return (
    <Container>
      <Shared.AccentMessage type="info" message="Photo Screen" />
    </Container>
  );
};

export default Photo;
