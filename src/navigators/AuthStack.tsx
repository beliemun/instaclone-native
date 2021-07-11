import React from "react";
import Shared from "@Components";
import Feed from "@screens/auth/Feed";
import Search from "@screens/auth/Search";
import Notification from "@screens/auth/Notification";
import MyProfile from "@screens/auth/MyPofile";
import Profile from "@screens/auth/Profile";
import Photo from "@screens/auth/Photo";
import Likes from "@screens/auth/Likes";
import Comments from "@screens/auth/Comments";
import { createStackNavigator } from "@react-navigation/stack";
import { darkTheme, lightTheme } from "@common/theme";
import { Image, View } from "react-native";
import { AuthStackParamList } from "~/../@types/navigation/auth";
import { useColorScheme } from "react-native";
import { logUserOut } from "~/apollo";

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

const renderHeaderRight = (screenName: string) =>
  screenName === "MyProfile" ? (
    <View style={{ marginRight: 10 }}>
      <Shared.LinkWithText text="Logout" onPress={() => logUserOut()} />
    </View>
  ) : null;

interface IProps {
  screenName: string;
}

const SharedStack: React.FC<IProps> = ({ screenName }) => {
  const colorScheme = useColorScheme();
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
        headerRight: () => renderHeaderRight(screenName),
      }}
    >
      {renderScreen(screenName)}
      <Stacks.Screen name="Profile" component={Profile} />
      <Stacks.Screen name="Photo" component={Photo} />
      <Stacks.Screen name="Likes" component={Likes} />
      <Stacks.Screen name="Comments" component={Comments} />
    </Stacks.Navigator>
  );
};

export default SharedStack;
