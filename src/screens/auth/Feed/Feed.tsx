import React, { useState } from "react";
import { FlatList, Platform, KeyboardAvoidingView } from "react-native";
import { Container } from "./styles";
import Shared from "@Components";
import { useQuery } from "@apollo/client";
import { seeFeed } from "types/__generated__/seeFeed";
import Photo from "~/Components/Photo";
import { FEED_QUERY } from "~/common/queries";

const Feed: React.FC = () => {
  const { data, loading, refetch, fetchMore } = useQuery<seeFeed>(FEED_QUERY, {
    variables: {
      offset: 0,
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
                renderItem={(item) => <Photo photo={item.item} />}
                keyExtractor={(item) => item.id.toString()}
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
