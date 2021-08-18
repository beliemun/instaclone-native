import React from "react";
import { Container } from "./styles";
import Shared from "@Components";

const Upload: React.FC = () => {
  return (
    <Container>
      <Shared.AccentMessage type="info" message="Upload Screen" />
    </Container>
  );
};

export default Upload;
