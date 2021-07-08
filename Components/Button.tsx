import React from "react";
import styled from "styled-components/native";
import {
  ActivityIndicator,
  GestureResponderEvent,
  useColorScheme,
} from "react-native";
import { darkTheme, lightTheme } from "../common/theme";

export const Button = styled.TouchableOpacity`
  width: 100%;
  color: ${(props) => props.theme.buttonTextColor};
  background-color: ${(props) => props.theme.windowColor};
  border: 1px solid ${(props) => props.theme.borderColorMedium};
  border-radius: 10px;
  padding: 10px 12px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.color};
  font-weight: bold;
  text-align: center;
`;

interface ButtonWithTextProps {
  text?: string;
  disabled: boolean;
  loading: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export const ButtonWithText: React.FC<ButtonWithTextProps> = ({
  text,
  disabled,
  loading,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator
          color={colorScheme === "light" ? lightTheme.color : darkTheme.color}
        />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
};
