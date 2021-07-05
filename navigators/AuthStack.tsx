import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Feed from "../screens/auth/Feed";
import Search from "../screens/auth/Search";
import Notification from "../screens/auth/Notification";
import MyProfile from "../screens/auth/MyPofile";
import Photo from "../screens/auth/Photo";
import Profile from "../screens/auth/Profile";
import { AuthStackParamList } from "../@types/navigation/auth";
import { darkTheme, lightTheme } from "../common/theme";
import { Image } from "react-native";
import { View } from "react-native";
import Shared from "../Components";

interface IProps {
  colorScheme: "light" | "dark" | null | undefined;
  screenName: string;
}

const Stacks = createStackNavigator<AuthStackParamList>();

const renderScreen = (screenName: string) => {
  switch (screenName) {
    case "Feed":
      return (
        <Stacks.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Shared.CenterView>
                <Image
                  style={{ maxHeight: 30 }}
                  resizeMode="contain"
                  source={require("../assets/logo.png")}
                />
              </Shared.CenterView>
            ),
          }}
        />
      );
    case "Search":
      return <Stacks.Screen name="Search" component={Search} />;
    case "Notification":
      return <Stacks.Screen name="Notification" component={Notification} />;
    case "MyProfile":
      return <Stacks.Screen name="MyProfile" component={MyProfile} />;
    default:
      return null;
  }
};

const SharedStack: React.FC<IProps> = ({ colorScheme, screenName }) => {
  return (
    <Stacks.Navigator
      headerMode="screen"
      screenOptions={{
        headerTintColor:
          colorScheme === "light" ? lightTheme.color : darkTheme.color,
        headerStyle: {
          backgroundColor:
            colorScheme === "light"
              ? lightTheme.backgroundColor
              : darkTheme.backgroundColor,
          shadowColor: "transparent", // for iOS
          elevation: 0, // for Android
        },
        headerBackTitleVisible: false, // 안드로디는 기본으로 꺼짐
      }}
    >
      {renderScreen(screenName)}
      <Stacks.Screen name="Profile" component={Profile} />
      <Stacks.Screen name="Photo" component={Photo} />
    </Stacks.Navigator>
  );
};

export default SharedStack;
