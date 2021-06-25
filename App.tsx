import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import UnAuth from "./navigators/UnAuth";
import { AppearanceProvider } from "react-native-appearance";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./common/globalStyles";

export default function App() {
  const [loading, setLoading] = useState(true);
  const preload = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontsPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagesPromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    await Promise.all<Promise<void> | Promise<Asset[]>>([
      ...fontsPromises,
      ...imagesPromises,
    ]);
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

  return loading ? (
    <AppLoading startAsync={preload} onFinish={onFinish} onError={onError} />
  ) : (
    <AppearanceProvider>
      <ThemeProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>
        <StatusBar barStyle={getThemeStyle()} />
        <UnAuth colorScheme={colorScheme} />
      </ThemeProvider>
    </AppearanceProvider>
  );
}
