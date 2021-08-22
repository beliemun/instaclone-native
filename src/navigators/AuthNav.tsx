import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "types/navigation/auth";
import AuthTab from "./AuthTabNav";
import UploadTabNav from "./UploadTabNav";
import Comments from "~/screens/auth/Comments";
import EditProfile from "~/screens/auth/EditProfile";
import Message from "~/screens/auth/Message";
import { NavigationContainer } from "@react-navigation/native";
import UploadPhoto from "~/screens/auth/UploadPhoto";
import { Ionicons } from "@expo/vector-icons";

const Stacks = createStackNavigator<AuthStackParamList>();

const Auth: React.FC = () => (
  <NavigationContainer>
    <Stacks.Navigator mode="modal">
      <Stacks.Screen
        name="Tabs"
        component={AuthTab}
        options={{ headerShown: false }}
      />
      <Stacks.Screen
        name="UploadNav"
        component={UploadTabNav}
        options={{ headerShown: false }}
      />
      <Stacks.Screen name="Comments" component={Comments} />
      <Stacks.Screen name="EditProfile" component={EditProfile} />
      <Stacks.Screen name="Message" component={Message} />
      <Stacks.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{
          title: "Upload Photo",
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons name={"close"} color={tintColor} size={28} />
          ),
        }}
      />
    </Stacks.Navigator>
  </NavigationContainer>
);

export default Auth;
