import styled from "styled-components/native";

export const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 55px;
`;

export const WrapView = styled.View`
  flex-direction: row;
  flex-wrap: warp;
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;

export const ItemSeparator = styled.View<{ height: number }>`
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.theme.backgroundColor};
`;
