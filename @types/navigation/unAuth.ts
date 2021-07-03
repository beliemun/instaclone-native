import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type UnAuthStackParamList = {
  Home: undefined;
  Login: { userName: string; password: string } | undefined;
  CreateAccount: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  UnAuthStackParamList,
  "Home"
>;
export type LoginScreenNavigationProp = StackNavigationProp<
  UnAuthStackParamList,
  "Login"
>;
export type CreateScreenNavationProp = StackNavigationProp<
  UnAuthStackParamList,
  "CreateAccount"
>;

export type HomeScreenRouteProp = RouteProp<UnAuthStackParamList, "Home">;
export type LoginScreenRouteProp = RouteProp<UnAuthStackParamList, "Login">;
export type CreateAccountScreenRouteProp = RouteProp<
  UnAuthStackParamList,
  "CreateAccount"
>;
