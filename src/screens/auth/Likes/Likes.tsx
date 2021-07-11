import React, { useState } from "react";
import Shared from "@Components";
import { FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  LikesScreenNavigationProp,
  LikesScreenRouteProp,
} from "types/navigation/auth";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGMENT } from "@common/fragments";
import { LoadingLayout } from "~/Components/LoadingLayout";
import { seePhotoLikes } from "types/__generated__/seePhotoLikes";
import ListItem from "~/Components/ListItem";

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!, $offset: Int!) {
    seePhotoLikes(id: $id, offset: $offset) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const Likes: React.FC = () => {
  const route = useRoute<LikesScreenRouteProp>();

  const {
    data,
    loading: likeLoading,
    refetch,
    fetchMore,
  } = useQuery<seePhotoLikes>(LIKES_QUERY, {
    variables: {
      id: route?.params?.photoId,
      offset: 0,
    },
    skip: !route?.params?.photoId,
  });
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    if (likeLoading) {
      return;
    }
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <LoadingLayout loading={likeLoading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seePhotoLikes}
        renderItem={(item) => <ListItem {...item.item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Shared.ItemSeparator height={0} />}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={() =>
          fetchMore({
            variables: {
              id: route?.params?.photoId,
              offset: data?.seePhotoLikes?.length,
            },
          })
        }
      />
    </LoadingLayout>
  );
};

export default Likes;
