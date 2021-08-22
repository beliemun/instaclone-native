import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: black;
`;

export const HeaderRight = styled.TouchableOpacity``;

export const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.accent};
  font-weight: bold;
  padding: 5px;
`;
