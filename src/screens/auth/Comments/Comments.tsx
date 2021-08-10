import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import Shared from "@Components";
import { Container } from "./styles";
import { useApolloClient, useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { CommentsScreenRouteProp } from "types/navigation/auth";
import { seePhotoComments } from "types/__generated__/seePhotoComments";
import CommentItem from "~/Components/CommentItem";
import CommentInput from "~/Components/CommentInput";
import useUser from "~/hooks/useUser";
import { SEE_PHOTO_COMMENTS_QUERY } from "~/common/queries";
import { COMMENT_FRAGMENT } from "~/common/fragments";

const Comments: React.FC = () => {
  const route = useRoute<CommentsScreenRouteProp>();
  const { cache } = useApolloClient();
  const loggedInUser = useUser();
  const {
    params: { user, caption },
  } = route;
  const [refreshing, setRefreshing] = useState(false);

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

  const refresh = async () => {
    if (loading) return;
    setRefreshing(true);
    deleteCommentCaches();
    await refetch();
    setRefreshing(false);
  };

  const deleteCommentCaches = () => {
    data?.seePhotoComments?.map((comment) => {
      cache.evict({
        id: `Comment:${comment.id}`,
      });
    });
  };

  const updatePhotoCache = () => {
    const comments = data?.seePhotoComments
      ?.filter((_, index) => index < 2)
      .map((comment) =>
        cache.writeFragment({
          id: `Comment:${comment.id}`,
          fragment: COMMENT_FRAGMENT,
          fragmentName: "CommentFragment",
          data: comment,
        })
      );
    cache.modify({
      id: `Photo:${route?.params?.photoId}`,
      fields: {
        comments: () => comments,
      },
    });
  };

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
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <CommentItem
                __typename="Comment"
                id={0}
                user={user}
                text={caption ?? ""}
                isMine={loggedInUser.data?.me?.userName == user.userName}
                createdAt=""
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
              }).then((result) => {
                const length = result.data.seePhotoComments?.length;
                if (length === 0) {
                  updatePhotoCache();
                }
              })
            }
          />
          <TouchableOpacity onPress={refresh}>
            <Text>Refresh!</Text>
          </TouchableOpacity>
          <CommentInput
            photoId={route?.params?.photoId}
            refresh={refresh}
            type={"Comments"}
          />
        </Container>
      </Shared.LoadingLayout>
    </KeyboardAvoidingView>
  );
};

export default Comments;
