import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const isChangedFollowVar = makeVar(false);
export const takeVar = makeVar(2);

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem("token", token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.clear();
  isLoggedInVar(false);
  tokenVar("");
  await client.resetStore();
};

// App.tsx에서 persistCache 기능을 사용하기 위해 외부로 위치.
// persistCache는 오프라인 상태에서도 cache로 읽어올 수 있는 데이터로 화면을 미리 구성할 수 있게 해준다.
export const cache = new InMemoryCache({
  typePolicies: {
    User: {
      keyFields: (obj) => `User:${obj.userName}`,
    },
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
        seePhotoLikes: offsetLimitPagination(["id"]),
        seePhotoComments: offsetLimitPagination(["id"]),
        seeFollowers: offsetLimitPagination(["userName"]),
        seeFollowing: offsetLimitPagination(["userName"]),
        seeRooms: offsetLimitPagination(),
        // seeRoom: offsetLimitPagination(["id"]),
        // 위 함수는 아래 코드를 간편하게 사용할 수 있도록 구현된 함수
        // seePhotoComments: {
        //   keyArgs: ["id"],
        //   merge(existing, incoming, { args: { offset } }) {
        //     console.log("offset:", offset);
        //     // Slicing is necessary because the existing data is immutable, and frozen in development.
        //     const merged = existing ? existing.slice(0) : [];
        //     for (let i = 0; i < incoming.length; i++) {
        //       merged[offset + i] = incoming[i];
        //     }
        //     return merged;
        //   },
        // },
        // [중요]
        // keyArgs를 false로 하면 해당쿼리는 어떤 Args(id)를 넣어 보내던지 하나로 합쳐버린다. Web Chache에서만 확인 가능.
        // 따라서 포스트마다 캐시를 하고 싶다면 KeyArgs는 id를 넣어서 어떤 기준으로 포스트를 나누어 캐시할 것인지 명시해줘야 한다.
        // typePolicies를 명시하지 않으면 새로 들어온 데이터 처리 방법을 모르는 Apollo는 더이상 렌더하지 않는다.
      },
    },
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});
const onErrorLink = onError((error) => {
  console.log(error);
});
const uploadHttpLink = createUploadLink({
  uri: "http://d7f2-61-75-22-201.ngrok.io/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://d7f2-61-75-22-201.ngrok.io/graphql",
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: tokenVar(),
    }),
  },
});
const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinks
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
