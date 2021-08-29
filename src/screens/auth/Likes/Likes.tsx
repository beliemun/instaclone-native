import React, { useEffect, useState } from "react";
import Shared from "@Components";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { LikesScreenRouteProp } from "types/navigation/auth";
import { useApolloClient, useQuery, useReactiveVar } from "@apollo/client";
import { seePhotoLikes } from "types/__generated__/seePhotoLikes";
import ListItem from "~/Components/ListItem";
import { LIKES_QUERY } from "~/common/queries";
import { takeVar } from "~/apollo";

const Likes: React.FC = () => {
  const { cache } = useApolloClient();
  const take = useReactiveVar(takeVar);
  const route = useRoute<LikesScreenRouteProp>();
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery<seePhotoLikes>(
    LIKES_QUERY,
    {
      variables: {
        id: route?.params?.photoId,
        offset: 0,
        take,
      },
      skip: !route?.params?.photoId,
    }
  );

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    if (loading) return;
    setRefreshing(true);
    deleteCaches();
    await refetch();
    setRefreshing(false);
  };

  const deleteCaches = () => {
    cache.evict({ id: "ROOT_QUERY", fieldName: "seePhotoLikes" });
  };

  return (
    <Shared.LoadingLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seePhotoLikes}
        renderItem={({ item: user }) => <ListItem user={user} />}
        keyExtractor={({ id }) => id.toString()}
        ItemSeparatorComponent={() => <Shared.ItemSeparator height={0} />}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={() =>
          fetchMore({
            variables: {
              id: route?.params?.photoId,
              offset: data?.seePhotoLikes?.length,
              take,
            },
          })
        }
      />
    </Shared.LoadingLayout>
  );
};

export default Likes;
