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
      props.hasError ? props.theme.error : props.theme.borderColorLight};
  border-radius: 10px;
  margin-bottom: ${(props) => props.marginBottom}px;
`;

interface IProps extends TextInputProps {
  inputRef: any;
  marginBottom?: number;
  hasError: boolean;
}

export const Input: React.FC<IProps> = (props) => (
  <StyledInput
    {...props}
    ref={props.inputRef}
    placeholder={props.placeholder}
    placeholderTextColor={"gray"}
    keyboardType={props.keyboardType}
    returnKeyType={props.returnKeyType}
    secureTextEntry={props.secureTextEntry}
    onSubmitEditing={props.onSubmitEditing}
    autoCapitalize={props.autoCapitalize}
    onChangeText={props.onChangeText}
    onKeyPress={props.onKeyPress}
    marginBottom={props.marginBottom ?? 0}
    hasError={props.hasError}
  />
);
