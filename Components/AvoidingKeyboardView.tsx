import React from "react";
import {
  KeyboardAvoidingView as View,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";

export const KeyboardAvoidingView: React.FC = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -250}
      style={{ flex: 1 }}
    >
      {children}
    </View>
  </TouchableWithoutFeedback>
);
