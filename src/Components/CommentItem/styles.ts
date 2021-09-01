import styled from "styled-components/native";
import { BoldText } from "../Base";

export const Container = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.windowColor};
  border: 1px solid ${(props) => props.theme.borderColorLight};
  border-left-width: 0px;
  border-top-width: 0px;
  border-right-width: 0px;
  padding: 10px;
`;

export const AvatarContainer = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 10px;
  overflow: hidden;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
`;

export const CaptionContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Username = styled(BoldText)`
  color: ${(props) => props.theme.color};
  margin-right: 5px;
`;
