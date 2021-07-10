import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled.ActivityIndicator`
  color: ${(props) => props.theme.color};
`;

interface IProps {
  loading: boolean;
  children: React.ReactChild;
}

export const LoadingLayout: React.FC<IProps> = ({ loading, children }) => {
  return loading ? <Indicator /> : <Container>{children}</Container>;
};
