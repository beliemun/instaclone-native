import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { UploadTabParamList } from "types/navigation/auth";
import SelectPhoto from "~/screens/auth/SelectPhoto";
import TakePhoto from "~/screens/auth/TakePhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createMaterialTopTabNavigator<UploadTabParamList>();
const Stacks = createStackNavigator();

const UploadTabNav: React.FC = () => (
  <Tabs.Navigator
    tabBarPosition="bottom"
    tabBarOptions={{ indicatorStyle: { top: 0 } }}
  >
    <Tabs.Screen name="Select">
      {() => (
        <Stacks.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerBackImage: ({ tintColor }) => (
              <Ionicons name={"close"} color={tintColor} size={28} />
            ),
          }}
        >
          <Stacks.Screen
            name="Select"
            options={{ title: "Choose a photo" }}
            component={SelectPhoto}
          />
        </Stacks.Navigator>
      )}
    </Tabs.Screen>
    <Tabs.Screen name="Take" component={TakePhoto} />
  </Tabs.Navigator>
);
export default UploadTabNav;
