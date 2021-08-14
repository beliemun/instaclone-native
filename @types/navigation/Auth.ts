import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { seeFeed_seeFeed_user } from "types/__generated__/seeFeed";

export type AuthTabParamList = {
  Feed: undefined;
  Search: undefined;
  Upload: undefined;
  Notification: undefined;
  MyProfile: undefined;
};

export type AuthStackParamList = {
  Feed: undefined;
  Search: undefined;
  Notification: undefined;
  MyProfile: undefined;
  Profile: { user: seeFeed_seeFeed_user };
  EditProfile: undefined;
  Photo: { id: number };
  Likes: { photoId: number };
  Comments: {
    photoId: number;
    user: seeFeed_seeFeed_user;
    caption: string | null;
  };
  Followers: { userName: string };
  Following: { userName: string };
};

export type FeedScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthTabParamList, "Feed">,
  StackNavigationProp<AuthStackParamList>
>;
export type SearchScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthTabParamList, "Search">,
  StackNavigationProp<AuthStackParamList>
>;
export type UploadScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthTabParamList, "Upload">,
  StackNavigationProp<AuthStackParamList>
>;
export type NotificationScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthTabParamList, "Notification">,
  StackNavigationProp<AuthStackParamList>
>;
export type MyProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthTabParamList, "MyProfile">,
  StackNavigationProp<AuthStackParamList>
>;
export type ProfileScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;
export type EditProfileScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;
export type PhotoScreenNavigationProp = StackNavigationProp<AuthStackParamList>;
export type LikesScreenNavigationProp = StackNavigationProp<AuthStackParamList>;
export type CommentsScreenNavigationProp =
  StackNavigationProp<AuthStackParamList>;

export type FeedScreenRouteProp = RouteProp<AuthTabParamList, "Feed">;
export type SearchScreenRouteProp = RouteProp<AuthTabParamList, "Search">;
export type UploadScreenRouteProp = RouteProp<AuthTabParamList, "Upload">;
export type NotificationScreenRouteProp = RouteProp<
  AuthTabParamList,
  "Notification"
>;
export type MyProfileScreenRouteProp = RouteProp<AuthTabParamList, "MyProfile">;
export type ProfileScreenRouteProp = RouteProp<AuthStackParamList, "Profile">;
export type EditProfileScreenRouteProp = RouteProp<
  AuthStackParamList,
  "EditProfile"
>;
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
