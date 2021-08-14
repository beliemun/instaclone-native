import { color } from "react-native-reanimated";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.windowColor};
  padding: 15px;
`;

export const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const AvatarContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 10px;
`;
export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
`;
export const Body = styled.View`
  margin: 20px 0;
`;
export const InputContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
export const Label = styled.Text`
  width: 110px;
  color: ${(props) => props.theme.color};
  padding: 10px 0;
`;
export const Input = styled.TextInput`
  flex: 1;
  color: ${(props) => props.theme.color};
  padding: 10px;
  border: 1px solid ${(props) => props.theme.borderColorLight};
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
`;
