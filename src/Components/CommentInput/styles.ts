import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 10px 10px;
  border: 1px solid ${(props) => props.theme.borderColorLight};
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
`;

export const Input = styled.TextInput`
  flex: 1;
  background-color: ${(props) => props.theme.windowColor};
  padding: 10px;
`;

export const AvatarContainer = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
`;
