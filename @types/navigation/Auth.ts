import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export type AuthTabParamList = {
  Feed: undefined;
};

export type FeedScreenNavigationProp = BottomTabNavigationProp<
  AuthTabParamList,
  "Feed"
>;

export type FeedScreenRouteProp = RouteProp<AuthTabParamList, "Feed">;
