import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { UploadTabParamList } from "types/navigation/auth";
import SelectPhoto from "~/screens/auth/SelectPhoto";
import TakePhoto from "~/screens/auth/TakePhoto";

const Tabs = createMaterialTopTabNavigator<UploadTabParamList>();

const UploadTabNav: React.FC = () => (
  <Tabs.Navigator
    tabBarPosition="top"
    tabBarOptions={{ indicatorStyle: { bottom: 0 } }}
  >
    <Tabs.Screen name="Select" component={SelectPhoto} />
    <Tabs.Screen name="Take" component={TakePhoto} />
  </Tabs.Navigator>
);
export default UploadTabNav;
