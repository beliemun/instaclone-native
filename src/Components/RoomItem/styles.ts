import styled from "styled-components/native";
import { BoldText } from "../Base";

export const Container = styled.TouchableOpacity`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.windowColor};
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
  flex: 1;
  width: 100%;
  flex-direction: row;
`;

export const LastMessage = styled.Text<{ unreadTotal: number }>`
  color: ${(props) =>
    props.unreadTotal > 0 ? props.theme.accent : props.theme.borderColorDark};
  font-weight: ${(props) => (props.unreadTotal > 0 ? 600 : 400)};
  margin-right: 5px;
`;

export const UnreadText = styled.Text`
  color: white;
  text-align: center;
  min-width: 16px;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 8px;
  font-weight: 900;
  background-color: ${(props) => props.theme.accent};
  overflow: hidden;
  margin-right: 4px;
`;

export const ButtonContainer = styled.View`
  height: 100%;
`;

export const UpdatedAtText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.borderColorDark};
  /* background-color: red; */
`;
