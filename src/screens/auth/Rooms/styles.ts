import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.windowColor};
`;
