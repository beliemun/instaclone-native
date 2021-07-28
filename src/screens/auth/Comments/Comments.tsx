import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import Shared from "@Components";
import { Container } from "./styles";
import { gql, useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { CommentsScreenRouteProp } from "types/navigation/auth";
import { seePhotoComments } from "types/__generated__/seePhotoComments";
import CommentItem from "~/Components/CommentItem";
import CommentInput from "~/Components/CommentInput";

const SEE_PHOTO_COMMENTS_QUERY = gql`
  query seePhotoComments($id: Int!, $offset: Int!) {
    seePhotoComments(id: $id, offset: $offset) {
      id
      user {
        id
        userName
        avatar
      }
      text
    }
  }
`;

const Comments: React.FC = () => {
  const route = useRoute<CommentsScreenRouteProp>();
  const {
    params: { user, caption },
  } = route;
  const { data, loading, refetch, fetchMore } = useQuery<seePhotoComments>(
    SEE_PHOTO_COMMENTS_QUERY,
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

  // console.log("Comments:", route?.params?.photoId);
  // console.log(data);

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : -250}
      style={{ flex: 1 }}
    >
      <Shared.LoadingLayout loading={loading}>
        <Container>
          <FlatList
            style={{ width: "100%" }}
            data={data?.seePhotoComments}
            renderItem={(item) => <CommentItem {...item.item} />}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <CommentItem
                __typename="Comment"
                id={0}
                user={user}
                text={caption ?? ""}
              />
            }
            ItemSeparatorComponent={() => <Shared.ItemSeparator height={0} />}
            refreshing={refreshing}
            onRefresh={refresh}
            onEndReached={() =>
              fetchMore({
                variables: {
                  id: route?.params?.photoId,
                  offset: data?.seePhotoComments?.length,
                },
              })
            }
          />
          <CommentInput photoId={route?.params?.photoId} />
        </Container>
      </Shared.LoadingLayout>
    </KeyboardAvoidingView>
  );
};

export default Comments;
