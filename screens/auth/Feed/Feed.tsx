import React, { useState } from "react";
import { Container } from "./styles";
import Shared from "../../../Components";
import { logUserOut } from "../../../apollo";
import {
  FeedScreenNavigationProp,
  FeedScreenRouteProp,
} from "../../../@types/navigation/auth";
import {
  COMMENT_FRAGMENT,
  PHOTO_FRAGMENT,
  USER_FRAGMENT,
} from "../../../common/fragments";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { Text } from "react-native";
import FeedItem from "./FeedItem";
import Photo from "../Photo";
import {
  seeFeed,
  seeFeed_seeFeed,
} from "../../../@types/__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        ...UserFragment
      }
      comments {
        ...CommentFragment
      }
    }
  }
  ${USER_FRAGMENT}
  ${COMMENT_FRAGMENT}
  ${PHOTO_FRAGMENT}
`;

interface IProps {
  navigation: FeedScreenNavigationProp;
  route: FeedScreenRouteProp;
}

const Feed: React.FC<IProps> = ({ navigation, route }) => {
  const { data, loading, refetch } = useQuery<seeFeed>(FEED_QUERY);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Container>
      <Shared.LoadingLayout loading={loading}>
        <FlatList
          data={data?.seeFeed}
          renderItem={(item) => <FeedItem {...item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Shared.ItemSeparator />}
          refreshing={refreshing}
          onRefresh={refresh}
        />
      </Shared.LoadingLayout>
      <Shared.ButtonWithText
        text="Logout"
        onPress={() => logUserOut()}
        loading={false}
        disabled={false}
      />
    </Container>
  );
};

export default Feed;
