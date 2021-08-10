import React from "react";
import styled from "styled-components/native";

interface IStlyedProps {
  type: "error" | "info";
}
interface IProps extends IStlyedProps {
  message: string | undefined;
}
const Container = styled.Text<IStlyedProps>`
  color: ${(props) =>
    props.type === "error" ? props.theme.error : props.theme.accent};
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
`;
const AccentMessage: React.FC<IProps> = ({ type, message }) =>
  message ? <Container type={type}>{message}</Container> : null;

export default AccentMessage;
