import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  LoginScreenNavigationProp,
  LoginScreenRouteProp,
} from "../../@types/navigation/unAuth";

interface Props {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

const Login: React.FC<Props> = ({ navigation, route }) => {
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text>Go to Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
