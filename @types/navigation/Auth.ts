import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { seeFeed_seeFeed_user } from "types/__generated__/seeFeed";

export type AuthTabParamList = {
  Feed: undefined;
  Search: undefined;
  Camera: undefined;
  Notification: undefined;
  MyProfile: undefined;
};

export type AuthStackParamList = {
  // Top Level Stacks
  Tabs: undefined;
  Comments: {
    photoId: number;
    user: seeFeed_seeFeed_user;
    caption: string | null;
  };
  EditProfile: undefined;
  Upload: undefined;
  Message: undefined;

  // Tab Screens
  Feed: undefined;
  Search: undefined;
  Notification: undefined;
  MyProfile: undefined;

  // Dependent Screens
  Profile: { user: seeFeed_seeFeed_user };
  Photo: { id: number };
  Likes: { photoId: number };
  Followers: { userName: string };
  Following: { userName: string };
};

// Tabs Navigation Props
export type FeedScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthTabParamList, "Feed">,
  StackNavigationProp<AuthStackParamList>
>;
export type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthTabParamList, "Search">,
  StackNavigationProp<AuthStackParamList>
>;
export type UploadScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthTabParamList, "Camera">,
  StackNavigationProp<AuthStackParamList>
>;
export type NotificationScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthTabParamList, "Notification">,
  StackNavigationProp<AuthStackParamList>
>;

// Stacks Navigation Props
export type ProfileScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;
export type LikesScreenNavigationProp = StackNavigationProp<AuthStackParamList>;
export type CommentsScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

// Route Props
export type SearchScreenRouteProp = RouteProp<AuthTabParamList, "Search">;
export type NotificationScreenRouteProp = RouteProp<
  AuthTabParamList,
  "Notification"
>;
export type ProfileScreenRouteProp = RouteProp<AuthStackParamList, "Profile">;
export type PhotoScreenRouteProp = RouteProp<AuthStackParamList, "Photo">;
export type LikesScreenRouteProp = RouteProp<AuthStackParamList, "Likes">;
export type CommentsScreenRouteProp = RouteProp<AuthStackParamList, "Comments">;
export type FollowersScreenRouteProp = RouteProp<
  AuthStackParamList,
  "Followers"
>;
export type FollowingScreenRouteProp = RouteProp<
  AuthStackParamList,
  "Following"
>;
