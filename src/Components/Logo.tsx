import React from "react";
import { Image } from "react-native";

const Logo = ({ maxWidth }: { maxWidth: string }) => (
  <Image
    source={require("../assets/logo.png")}
    resizeMode="contain"
    style={{ maxWidth }}
  />
);

export default Logo;
