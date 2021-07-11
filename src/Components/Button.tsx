import React from "react";
import styled from "styled-components/native";
import {
  ActivityIndicator,
  GestureResponderEvent,
  useColorScheme,
  View,
} from "react-native";
import { darkTheme, lightTheme } from "@common/theme";

export const Button = styled.TouchableOpacity<{ isFullWidth: boolean }>`
  width: ${(props) => (props.isFullWidth ? "100%" : "null")};
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
  disabled?: boolean;
  loading?: boolean;
  isFullWidth?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export const ButtonWithText: React.FC<ButtonWithTextProps> = ({
  text,
  disabled = false,
  loading = false,
  isFullWidth = false,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  return (
    <Button disabled={disabled} onPress={onPress} isFullWidth={isFullWidth}>
      {loading ? (
        <View style={{ flexDirection: "row" }}>
          <ActivityIndicator
            color={colorScheme === "light" ? lightTheme.color : darkTheme.color}
          />
        </View>
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
};
