import styled from "styled-components/native";

export const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const WrapView = styled.View`
  flex-direction: row;
  flex-wrap: warp;
`;

interface ContainerProps {
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
}

export const Container = styled.View<ContainerProps>`
  margin: ${(props) => props.margin ?? 0}px;
  margin-top: ${(props) => props.marginTop ?? 0}px;
  margin-right: ${(props) => props.marginRight ?? 0}px;
  margin-bottom: ${(props) => props.marginBottom ?? 0}px;
  margin-left: ${(props) => props.marginLeft ?? 0}px;

  padding: ${(props) => props.padding ?? 0}px;
  padding-top: ${(props) => props.paddingTop ?? 0}px;
  padding-right: ${(props) => props.paddingRight ?? 0}px;
  padding-bottom: ${(props) => props.paddingBottom ?? 0}px;
  padding-left: ${(props) => props.paddingLeft ?? 0}px;
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;

export const ItemSeparator = styled.View`
  height: 30px;
  background-color: ${(props) => props.theme.backgroundColor};
`;
