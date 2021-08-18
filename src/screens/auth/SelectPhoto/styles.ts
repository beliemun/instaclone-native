import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Top = styled.View`
  flex: 1;
`;

export const Bottom = styled.View`
  margin-top: 3px;
  flex: 1;
`;

export const ImageContainer = styled.TouchableOpacity``;

export const Target = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Image = styled.Image<{ width: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
`;

export const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
