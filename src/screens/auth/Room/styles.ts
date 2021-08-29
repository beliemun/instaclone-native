import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const InputContainer = styled.View`
  width: 100%;
  background-color: white;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.borderColorLight};
  border-right-width: 0;
  border-left-width: 0;
  border-bottom-width: 0;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  font-size: 14px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.borderColorLight};
  border-radius: 25px;
  padding: 15px;
  margin-bottom: 30px;
`;
