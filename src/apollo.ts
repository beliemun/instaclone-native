import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem("token", token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.clear();
  isLoggedInVar(false);
  tokenVar("");
};

const httpLink = createHttpLink({
  uri: "http://df043f4b6ec3.ngrok.io/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

// App.tsx에서 persistCache 기능을 사용하기 위해 외부로 위치.
// persistCache는 오프라인 상태에서도 cache로 읽어올 수 있는 데이터로 화면을 미리 구성할 수 있게 해준다.
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
        // 위 함수는 아래 코드를 간편하게 사용할 수 있도록 구현된 함수
        // seeFeed: {
        //   keyArgs: false,
        //   merge(existing = [], incoming = []) {
        //     return [...existing, ...incoming];
        //   },
        // },
        // [중요]
        // Apollo는 같은 query문을 실행시켜도 Args가 다르면, 독립적으로 분리해서 처리하기 때문에,
        // Component의 state를 변화시키지 않아 rerendering 하지 않는다.
        // 따라서 args에 따라 구별시키는 거을 방지하기 위해 위 옵션을 사용한다.
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
