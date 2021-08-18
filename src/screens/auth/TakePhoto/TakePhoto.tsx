import React from "react";
import { Container } from "./styles";
import Shared from "@Components";

const TakePhoto: React.FC = () => {
  return (
    <Container>
      <Shared.AccentMessage type="info" message="TakePhoto Screen" />
    </Container>
  );
};

export default TakePhoto;
