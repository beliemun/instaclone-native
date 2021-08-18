import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "types/navigation/auth";
import AuthTab from "./AuthTabNav";
import UploadTabNav from "./UploadTabNav";
import Comments from "~/screens/auth/Comments";
import EditProfile from "~/screens/auth/EditProfile";
import Message from "~/screens/auth/Message";
import { NavigationContainer } from "@react-navigation/native";

const Stacks = createStackNavigator<AuthStackParamList>();

const Auth: React.FC = () => (
  <NavigationContainer>
    <Stacks.Navigator
      mode="modal"
      screenOptions={{ headerBackTitleVisible: false }}
    >
      <Stacks.Screen
        name="Tabs"
        component={AuthTab}
        options={{ headerShown: false }}
      />
      <Stacks.Screen name="Upload" component={UploadTabNav} />
      <Stacks.Screen name="Comments" component={Comments} />
      <Stacks.Screen name="EditProfile" component={EditProfile} />
      <Stacks.Screen name="Message" component={Message} />
    </Stacks.Navigator>
  </NavigationContainer>
);

export default Auth;
