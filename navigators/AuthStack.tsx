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

interface IProps {
  colorScheme: "light" | "dark" | null | undefined;
  screenName: string;
}

const Stacks = createStackNavigator<AuthStackParamList>();

const renderScreen = (screenName: string) => {
  switch (screenName) {
    case "Feed":
      return <Stacks.Screen name="Feed" component={Feed} />;
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
        headerBackTitleVisible: true,
      }}
    >
      {renderScreen(screenName)}
      <Stacks.Screen name="Profile" component={Profile} />
      <Stacks.Screen name="Photo" component={Photo} />
    </Stacks.Navigator>
  );
};

export default SharedStack;
