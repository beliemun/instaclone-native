import React from "react";
import styled from "styled-components/native";
import Photo from "@Components/Photo";
import { seeFeed_seeFeed } from "types/__generated__/seeFeed";

const Container = styled.View`
  background-color: ${(props) => props.theme.windowColor};
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
      <Photo {...item} />
    </Container>
  );
};

export default FeedItem;
