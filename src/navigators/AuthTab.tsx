import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthTabParamList } from "~/../@types/navigation/auth";
import { darkTheme, lightTheme } from "@common/theme";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import AuthStack from "./AuthStack";
import { useColorScheme } from "react-native";

const Tabs = createBottomTabNavigator<AuthTabParamList>();

const Auth: React.FC = () => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor:
            colorScheme === "light" ? lightTheme.accent : darkTheme.accent,
          style: {
            backgroundColor:
              colorScheme === "light"
                ? lightTheme.backgroundColor
                : darkTheme.backgroundColor,
          },
          showLabel: false,
        }}
      >
        <Tabs.Screen
          name="Feed"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        >
          {() => <AuthStack screenName={"Feed"} />}
        </Tabs.Screen>
        <Tabs.Screen
          name="Search"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        >
          {() => <AuthStack screenName={"Search"} />}
        </Tabs.Screen>
        <Tabs.Screen
          name="Upload"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "camera" : "camera-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        >
          {() => <View />}
        </Tabs.Screen>
        <Tabs.Screen
          name="Notification"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        >
          {() => <AuthStack screenName={"Notification"} />}
        </Tabs.Screen>
        <Tabs.Screen
          name="MyProfile"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        >
          {() => <AuthStack screenName={"MyProfile"} />}
        </Tabs.Screen>
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default Auth;
