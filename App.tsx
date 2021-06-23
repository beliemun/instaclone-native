import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import UnAuth from "./navigators/UnAuth";

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
  return loading ? (
    <AppLoading startAsync={preload} onFinish={onFinish} onError={onError} />
  ) : (
    <UnAuth />
  );
}
