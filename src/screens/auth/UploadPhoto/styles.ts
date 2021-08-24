import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
`;

export const HeaderRight = styled.TouchableOpacity``;

export const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.accent};
  font-weight: bold;
  padding: 5px;
`;

export const Thumnail = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin: 10px;
`;

export const Input = styled.TextInput<{ isUploading: boolean }>`
  flex: 1;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: ${(props) =>
    props.isUploading ? props.theme.borderColorDark : props.theme.color};
  margin: 10px 0;
`;
