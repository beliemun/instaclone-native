import React from "react";
import Shared from "@Components";
import Feed from "@screens/auth/Feed";
import Search from "~/screens/auth/Search";
import Notification from "@screens/auth/Notification";
import Profile from "@screens/auth/Profile";
import Photo from "@screens/auth/Photo";
import Likes from "@screens/auth/Likes";
import Followers from "@screens/auth/Followers";
import Following from "@screens/auth/Following";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { darkTheme, lightTheme } from "@common/theme";
import { Image, TouchableOpacity, View } from "react-native";
import { AuthStackParamList } from "~/../@types/navigation/auth";
import { useColorScheme } from "react-native";
import { logUserOut } from "~/apollo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stacks = createStackNavigator<AuthStackParamList>();

const renderScreen = (screenName: string) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
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
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
                <Ionicons
                  name="paper-plane-outline"
                  color={
                    colorScheme === "light" ? lightTheme.color : darkTheme.color
                  }
                  size={26}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
      );
    case "Search":
      return <Stacks.Screen name="Search" component={Search} />;
    case "Notification":
      return <Stacks.Screen name="Notification" component={Notification} />;
    case "MyProfile":
      return <Stacks.Screen name="MyProfile" component={Profile} />;
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
              ? lightTheme.windowColor
              : darkTheme.windowColor,
          shadowColor: "transparent", // for iOS
          elevation: 0, // for Android
        },
        headerBackTitleVisible: false, // ??????????????? ???????????? ??????
        headerRight: () =>
          screenName === "MyProfile" ? renderHeaderRight(screenName) : null,
      }}
    >
      {renderScreen(screenName)}
      <Stacks.Screen name="Profile" component={Profile} />
      <Stacks.Screen name="Photo" component={Photo} />
      <Stacks.Screen name="Likes" component={Likes} />
      <Stacks.Screen name="Followers" component={Followers} />
      <Stacks.Screen name="Following" component={Following} />
    </Stacks.Navigator>
  );
};

export default SharedStack;
