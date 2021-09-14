import styled from "styled-components/native";
import { BoldText } from "../Base";

export const Container = styled.View<{ isMine: boolean }>`
  flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
  justify-content: space-between;
  background-color: ${(props) => props.theme.windowColor};
  padding: 10px;
`;

export const AvatarContainer = styled.TouchableOpacity<{ isMine: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: ${(props) => (props.isMine ? "0" : "10px")};
  margin-left: ${(props) => (props.isMine ? "10px" : "0")};
  overflow: hidden;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
`;

export const FlexContainer = styled.View<{ isMine: boolean }>`
  flex: 1;
  flex-direction: column;
  margin-right: ${(props) => (props.isMine ? "0" : "10%")};
  margin-left: ${(props) => (props.isMine ? "10%" : "0")};
`;

export const Username = styled(BoldText)<{ isMine: boolean }>`
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  color: ${(props) => props.theme.color};
  margin-right: ${(props) => (props.isMine ? "5px" : "0")};
  margin-left: ${(props) => (props.isMine ? "5px" : "0")};
  margin-bottom: 5px;
`;

export const MessageContainer = styled.View<{ isMine: boolean }>`
  flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
  align-items: flex-end;
`;

export const MessageBalloon = styled.View<{ isMine: boolean }>`
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  background: #f0f0f0f0;
  border-radius: 6px;
  padding: 10px;
`;

export const Message = styled.Text`
  color: ${(props) => props.theme.color};
`;

export const ReadText = styled.Text`
  color: ${(props) => props.theme.borderColorDark};
  font-size: 12px;
  padding: 4px;
`;

export const CreatedAtText = styled.Text<{ isMine: boolean }>`
  color: ${(props) => props.theme.borderColorDark};
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  font-size: 12px;
  padding: 4px;
`;
