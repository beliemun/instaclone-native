import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/unAuth/Home";
import Login from "../screens/unAuth/Login";
import CreateAccount from "../screens/unAuth/CreateAccount";
import { UnAuthStackParamList } from "../@types/navigation/unAuth";
import { darkTheme, lightTheme } from "../common/theme";

interface IProps {
  colorScheme: "light" | "dark" | null | undefined;
}

const Stack = createStackNavigator<UnAuthStackParamList>();

const UnAuth: React.FC<IProps> = ({ colorScheme }) => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: "",
        headerTransparent: true,
        headerTintColor:
          colorScheme === "light" ? lightTheme.color : darkTheme.color,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default UnAuth;
