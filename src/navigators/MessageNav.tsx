import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AuthStackParamList,
  MessageStackParamList,
} from "types/navigation/auth";
import Rooms from "~/screens/auth/Rooms";
import Room from "~/screens/auth/Room";
import { RouteProp, useRoute } from "@react-navigation/native";

const Stack = createStackNavigator<MessageStackParamList>();

const MessageNav: React.FC = () => {
  const { params } = useRoute<RouteProp<AuthStackParamList, "Messages">>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rooms">
        {() =>
          params ? <Rooms id={params.id} target={params.target} /> : <Rooms />
        }
      </Stack.Screen>
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
};

export default MessageNav;
