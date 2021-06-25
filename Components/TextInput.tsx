import React from "react";
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  TextInputSubmitEditingEventData,
} from "react-native";
import styled from "styled-components/native";

const StyledTextInput = styled.TextInput<{ marginBottom: number }>`
  width: 100%;
  background-color: ${(props) => props.theme.windowColor};
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.borderColorLight};
  border-radius: 10px;
  margin-bottom: ${(props) => props.marginBottom}px;
`;

interface TextInputProps {
  ref?: any | undefined;
  autoFocus?: boolean | undefined;
  placeholder?: string | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
  secureTextEntry?: boolean | undefined;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
  marginBottom?: number;
}

// 함수형 컴포넌트에서는 ref 전달이 불가하여 React.forwardRef()를 사용해야 한다.
export const TextInput: React.FC<TextInputProps> = React.forwardRef(
  (props, ref) => {
    const {
      autoFocus,
      placeholder,
      keyboardType,
      returnKeyType,
      secureTextEntry,
      onSubmitEditing,
      marginBottom,
    } = props;
    return (
      <StyledTextInput
        ref={ref as any}
        autoFocus={autoFocus}
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        marginBottom={marginBottom ?? 0}
      />
    );
  }
);
