import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import { darkTheme, lightTheme } from "~/common/theme";

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

const LoadingLayout: React.FC<IProps> = ({ loading, children }) => {
  const colorScheme = useColorScheme();
  return loading ? (
    <Container>
      <Indicator
        color={colorScheme === "light" ? lightTheme.accent : darkTheme.accent}
      />
    </Container>
  ) : (
    <Container>{children}</Container>
  );
};

export default LoadingLayout;
