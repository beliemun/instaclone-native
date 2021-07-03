import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
};

const client = new ApolloClient({
  uri: "http://df043f4b6ec3.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
