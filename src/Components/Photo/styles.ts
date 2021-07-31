import styled from "styled-components/native";
import { BoldText } from "../Base";

export const Container = styled.View<{ width: number }>`
  background-color: ${(props) => props.theme.windowColor};
  border: 1px solid ${(props) => props.theme.borderColorLight};
  border-left-width: 0px;
  border-right-width: 0px;
`;
export const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
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
export const File = styled.Image`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;
export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
export const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
export const Footer = styled.View`
  padding: 10px;
  padding-bottom: 5px;
`;
export const Likes = styled(BoldText)`
  color:${(props) => props.theme.color}
  margin-bottom: 10px;
`;
export const Caption = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
export const CommentCount = styled.Text`
  color: ${(props) => props.theme.borderColorDark};
  margin-bottom: 10px;
`;
export const Comment = styled.View`
  flex-direction: row;
  margin-bottom: 3px;
`;
