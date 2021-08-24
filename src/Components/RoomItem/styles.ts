import styled from "styled-components/native";
import { BoldText } from "../Base";

export const Container = styled.TouchableOpacity`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.windowColor};
  border: 1px solid ${(props) => props.theme.borderColorLight};
  border-left-width: 0px;
  border-top-width: 0px;
  border-right-width: 0px;
  padding: 10px;
`;

export const AvatarContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
  overflow: hidden;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const Username = styled(BoldText)`
  color: ${(props) => props.theme.color};
  margin-right: 5px;
  margin-bottom: 5px;
`;

export const MessageContainter = styled.View`
  flex-direction: row;
`;

export const LastMessage = styled.Text<{ unreadTotal: number }>`
  color: ${(props) =>
    props.unreadTotal > 0 ? props.theme.accent : props.theme.borderColorDark};
  font-weight: ${(props) => (props.unreadTotal > 0 ? 600 : 400)};
  margin-right: 5px;
`;

export const UnreadDot = styled.View`
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.accent};
  margin-right: 5px;
`;

export const UnreadText = styled.Text`
  color: white;
  font-size: 11px;
  font-weight: bold;
`;

export const ButtonContainer = styled.View`
  height: 100%;
`;
