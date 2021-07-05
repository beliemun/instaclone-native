import React from "react";
import { Text } from "react-native";
import { ColorSchemeName, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { seeFeed_seeFeed } from "../../../@types/__generated__/seeFeed";
import { darkTheme, lightTheme } from "../../../common/theme";

const Container = styled.View`
  background-color: ${(props) => props.theme.windowColor};
  padding: 10px;
`;
const Name = styled.Text`
  color: ${(props) => props.theme.color};
`;

interface IProps {
  item: seeFeed_seeFeed;
}

const FeedItem: React.FC<IProps> = ({ item }) => {
  return (
    <Container>
      <Name>{item.caption}</Name>
    </Container>
  );
};

export default FeedItem;
