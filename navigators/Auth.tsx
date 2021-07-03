import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthTabParamList } from "../@types/navigation/Auth";
import Feed from "../screens/Feed";

interface IProps {
  colorScheme: "light" | "dark" | null | undefined;
}

const Tabs = createBottomTabNavigator<AuthTabParamList>();

const Auth: React.FC<IProps> = ({ colorScheme }) => (
  <NavigationContainer>
    <Tabs.Navigator>
      <Tabs.Screen name="Feed" component={Feed} />
    </Tabs.Navigator>
  </NavigationContainer>
);

export default Auth;
