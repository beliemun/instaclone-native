import React, { useState } from "react";
import { RefreshControl } from "react-native";
import Shared from "@Components";
import { useRoute } from "@react-navigation/native";
import { PhotoScreenRouteProp } from "types/navigation/auth";
import { useQuery } from "@apollo/client";
import { ScrollView } from "react-native-gesture-handler";
import Photo from "~/Components/Photo";
import { SEE_PHOTO_QUERY } from "~/common/queries";
import { seePhoto } from "types/__generated__/seePhoto";

const PhotoScreen: React.FC = () => {
  const route = useRoute<PhotoScreenRouteProp>();
  const { data, loading, refetch } = useQuery<seePhoto>(SEE_PHOTO_QUERY, {
    variables: {
      id: route?.params.id,
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
    <Shared.LoadingLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={refresh} refreshing={refreshing} />
        }
      >
        {data?.seePhoto && <Photo photo={data?.seePhoto} />}
      </ScrollView>
    </Shared.LoadingLayout>
  );
};

export default PhotoScreen;
