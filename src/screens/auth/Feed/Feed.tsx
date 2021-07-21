import React, { useState } from "react";
import { FlatList } from "react-native";
import { Container } from "./styles";
import Shared from "@Components";
import { gql, useQuery } from "@apollo/client";
import {
  COMMENT_FRAGMENT,
  PHOTO_FRAGMENT,
  USER_FRAGMENT,
} from "@common/fragments";
import { seeFeed } from "types/__generated__/seeFeed";
import Photo from "~/Components/Photo";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        ...UserFragment
      }
      comments {
        ...CommentFragment
      }
      hashtags {
        id
        hashtag
        createdAt
        photos {
          id
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${COMMENT_FRAGMENT}
  ${PHOTO_FRAGMENT}
`;

const Feed: React.FC = () => {
  const { data, loading, refetch, fetchMore } = useQuery<seeFeed>(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    if (loading) {
      return;
    }
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Container>
      <Shared.LoadingLayout loading={loading}>
        <FlatList
          data={data?.seeFeed}
          renderItem={(item) => <Photo photo={item.item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Shared.ItemSeparator height={30} />}
          refreshing={refreshing}
          onRefresh={refresh}
          onEndReached={() =>
            fetchMore({
              variables: {
                offset: data?.seeFeed?.length,
              },
            })
          }
        />
      </Shared.LoadingLayout>
    </Container>
  );
};

export default Feed;
