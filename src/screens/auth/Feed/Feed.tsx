import React, { useState } from "react";
import { FlatList, Platform, KeyboardAvoidingView } from "react-native";
import { Container } from "./styles";
import Shared from "@Components";
import { useApolloClient, useQuery, useReactiveVar } from "@apollo/client";
import { seeFeed } from "types/__generated__/seeFeed";
import Photo from "~/Components/Photo";
import { FEED_QUERY } from "~/common/queries";
import { useEffect } from "react";
import { isChangedFollowVar, takeVar } from "~/apollo";

const Feed: React.FC = () => {
  const { cache } = useApolloClient();
  const take = useReactiveVar(takeVar);
  const { data, loading, refetch, fetchMore } = useQuery<seeFeed>(FEED_QUERY, {
    variables: {
      offset: 0,
      take,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  const isChangedFollow = useReactiveVar(isChangedFollowVar);
  const refresh = async () => {
    if (loading) {
      return;
    }
    setRefreshing(true);
    cache.evict({ id: "ROOT_QUERY", fieldName: "seeFeed" });
    await refetch();
    setRefreshing(false);
    isChangedFollowVar(false);
  };

  useEffect(() => {
    // follow 혹은 unfollow시 미리 feed를 갱신한다.
    // [중요] 이부분을 개선해야 함. 이 코드로 인해 persist cache로 Feed가 빈배열로 덮어씌워짐.
    refresh();
  }, [isChangedFollow]);

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 92 : -200}
      style={{ flex: 1 }}
    >
      <Container>
        <Shared.LoadingLayout loading={loading}>
          <>
            {data?.seeFeed && (
              <FlatList
                data={data.seeFeed}
                renderItem={({ item }) => <Photo photo={item} />}
                keyExtractor={({ id }) => id.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <Shared.ItemSeparator height={30} />
                )}
                refreshing={refreshing}
                onRefresh={refresh}
                onEndReached={() =>
                  fetchMore({
                    variables: {
                      offset: data.seeFeed?.length,
                    },
                  })
                }
              />
            )}
          </>
        </Shared.LoadingLayout>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Feed;
