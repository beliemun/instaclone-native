import React from "react";
import styled from "styled-components/native";
import { GestureResponderEvent } from "react-native";

export const Link = styled.TouchableOpacity`
  padding: 10px 12px;
`;
export const LinkText = styled.Text`
  color: ${(props) => props.theme.accent};
  font-weight: bold;
`;
interface LinkWithTextProps {
  text?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}
export const LinkWithText: React.FC<LinkWithTextProps> = ({
  text,
  onPress,
}) => (
  <Link onPress={onPress}>
    <LinkText>{text}</LinkText>
  </Link>
);
