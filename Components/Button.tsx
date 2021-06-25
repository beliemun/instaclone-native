import React from "react";
import styled from "styled-components/native";
import { GestureResponderEvent } from "react-native";

export const Button = styled.TouchableOpacity`
  color: ${(props) => props.theme.buttonTextColor};
  background-color: ${(props) => props.theme.windowColor};
  border: 1px solid ${(props) => props.theme.borderColorLight};
  border-radius: 10px;
  padding: 10px 12px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.color};
  font-weight: bold;
`;

interface ButtonWithTextProps {
  text?: string;
  disabled: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export const ButtonWithText: React.FC<ButtonWithTextProps> = ({
  text,
  disabled,
  onPress,
}) => (
  <Button disabled={disabled} onPress={onPress}>
    <ButtonText>{text}</ButtonText>
  </Button>
);
