import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

const StyledInput = styled.TextInput<{
  marginBottom: number;
  hasError: boolean;
}>`
  width: 100%;
  background-color: ${(props) => props.theme.windowColor};
  padding: 10px 12px;
  border: 1px solid
    ${(props) =>
      props.hasError ? props.theme.error : props.theme.borderColorMedium};
  border-radius: 10px;
  margin-bottom: ${(props) => props.marginBottom}px;
`;

interface IProps extends TextInputProps {
  inputRef: any;
  marginBottom?: number;
  hasError: boolean;
}

const TextInput: React.FC<IProps> = (props) => (
  <StyledInput
    {...props}
    ref={props.inputRef}
    placeholderTextColor={"gray"}
    marginBottom={props.marginBottom ?? 0}
    hasError={props.hasError}
  />
);

export default TextInput;
