import React from "react";
import { Container } from "./styles";
import Shared from "@Components";

const SelectPhoto: React.FC = () => {
  return (
    <Container>
      <Shared.AccentMessage type="info" message="SelectPhoto Screen" />
    </Container>
  );
};

export default SelectPhoto;
