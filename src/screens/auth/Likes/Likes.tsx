import React, { useState } from "react";
import Shared from "@Components";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { LikesScreenRouteProp } from "types/navigation/auth";
import { useQuery } from "@apollo/client";
import { seePhotoLikes } from "types/__generated__/seePhotoLikes";
import ListItem from "~/Components/ListItem";
import { LIKES_QUERY } from "~/common/queries";

const Likes: React.FC = () => {
  const route = useRoute<LikesScreenRouteProp>();
  const { data, loading, refetch, fetchMore } = useQuery<seePhotoLikes>(
    LIKES_QUERY,
    {
      variables: {
        id: route?.params?.photoId,
        offset: 0,
      },
      skip: !route?.params?.photoId,
    }
  );
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
    <Shared.LoadingLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seePhotoLikes}
        renderItem={(item) => <ListItem user={item.item} />}
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
    </Shared.LoadingLayout>
  );
};

export default Likes;
