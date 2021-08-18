import React, { useState } from "react";
import Shared from "@Components";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FollowersScreenRouteProp } from "types/navigation/auth";
import { useApolloClient, useQuery, useReactiveVar } from "@apollo/client";
import ListItem from "~/Components/ListItem";
import { SEE_FOLLOWERS_QUERY } from "~/common/queries";
import { seeFollowers } from "types/__generated__/seeFollowers";
import { takeVar } from "~/apollo";

const Followers: React.FC = () => {
  const route = useRoute<FollowersScreenRouteProp>();
  const take = useReactiveVar(takeVar);
  const { cache } = useApolloClient();
  const { data, loading, refetch, fetchMore } = useQuery<seeFollowers>(
    SEE_FOLLOWERS_QUERY,
    {
      variables: {
        userName: route?.params?.userName,
        offset: 0,
        take,
      },
      skip: !route?.params?.userName,
    }
  );
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    if (loading) {
      return;
    }
    setRefreshing(true);
    deleteCommentCaches();
    await refetch();
    setRefreshing(false);
  };
  const deleteCommentCaches = () => {
    data?.seeFollowers?.map((user) => {
      cache.evict({
        id: `User:${user.userName}`,
      });
    });
  };

  return (
    <Shared.LoadingLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seeFollowers}
        renderItem={(item) => <ListItem user={item.item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Shared.ItemSeparator height={0} />}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={() =>
          fetchMore({
            variables: {
              userName: route?.params?.userName,
              offset: data?.seeFollowers?.length,
              take,
            },
          })
        }
      />
    </Shared.LoadingLayout>
  );
};

export default Followers;
