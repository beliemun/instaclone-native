import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Platform, StatusBar, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import Auth from "./navigators/AuthTab";
import UnAuth from "./navigators/UnAuth";
import { AppearanceProvider } from "react-native-appearance";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./common/theme";
import {
  ApolloProvider,
  NormalizedCacheObject,
  useReactiveVar,
} from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import { PersistentStorage, PersistedData } from "apollo3-cache-persist/types";

export default function App() {
  const [loading, setLoading] = useState(true);
  const preloadAssets = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontsPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagesPromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    await Promise.all<Promise<void> | Promise<Asset[]>>([
      ...fontsPromises,
      ...imagesPromises,
    ]);
  };
  const preloadToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
  };
  const preload = async () => {
    await preloadToken();
    // persistCache는 AppLoading이 되기전 세팅해줘야 한다.
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage) as PersistentStorage<
        PersistedData<NormalizedCacheObject>
      >,
    });

    return preloadAssets();
  };
  const onFinish = () => setLoading(false);
  const onError = () => console.warn;
  const colorScheme = useColorScheme();

  const getThemeStyle = () => {
    if (Platform.OS === "ios") {
      return colorScheme === "light" ? "dark-content" : "light-content";
    } else {
      return "default";
    }
  };

  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return loading ? (
    <AppLoading startAsync={preload} onFinish={onFinish} onError={onError} />
  ) : (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <ThemeProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>
          <StatusBar barStyle={getThemeStyle()} />
          {isLoggedIn ? <Auth /> : <UnAuth />}
        </ThemeProvider>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
