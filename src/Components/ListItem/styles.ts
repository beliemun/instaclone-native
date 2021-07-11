import styled from "styled-components/native";
import { BoldText } from "../Base";

export const Container = styled.View`
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

export const Username = styled(BoldText)`
  color: ${(props) => props.theme.color};
  margin-right: 5px;
`;

export const Link = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Following = styled.Text`
  color: ${(props) => props.theme.accent};
  margin-right: 5px;
`;
