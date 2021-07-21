import React, { useState } from "react";
import { RefreshControl } from "react-native";
import Shared from "@Components";
import { useRoute } from "@react-navigation/native";
import { PhotoScreenRouteProp } from "types/navigation/auth";
import { gql, useQuery } from "@apollo/client";
import {
  COMMENT_FRAGMENT,
  PHOTO_FRAGMENT,
  USER_FRAGMENT,
} from "~/common/fragments";
import { seePhoto } from "types/__generated__/seePhoto";
import { ScrollView } from "react-native-gesture-handler";
import Photo from "~/Components/Photo";

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
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

const PhotoScreen: React.FC = () => {
  const route = useRoute<PhotoScreenRouteProp>();
  const { data, loading, refetch } = useQuery<seePhoto>(SEE_PHOTO, {
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
