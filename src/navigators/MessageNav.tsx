import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MessageStackParamList } from "types/navigation/auth";
import Rooms from "~/screens/auth/Rooms";
import Room from "~/screens/auth/Room";

const Stack = createStackNavigator<MessageStackParamList>();

const MessageNav: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
};

export default MessageNav;
