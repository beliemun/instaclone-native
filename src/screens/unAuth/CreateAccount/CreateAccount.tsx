import React, { useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as CS from "./styles";
import Shared from "@Components";
import RegEx from "@common/rules";
import { gql, useMutation } from "@apollo/client";
import {
  CreateAccountScreenRouteProp,
  CreateScreenNavationProp,
} from "~/../@types/navigation/unAuth";
import { View } from "react-native";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $userName: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

interface IFormInput {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  error: string;
}

interface IProps {
  navigation: CreateScreenNavationProp;
  route: CreateAccountScreenRouteProp;
}

const CreateAccount: React.FC<IProps> = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { isValid, errors },
  } = useForm<IFormInput>({ mode: "onChange" });

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: (data) => {
        const {
          createAccount: { ok, error },
        } = data;
        const { userName, password } = getValues();
        if (ok) {
          navigation.navigate("Login", {
            userName,
            password,
          });
        } else {
          setError("error", { message: error });
        }
      },
    }
  );

  const fisrtNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onFocus = (ref: any) => ref?.current?.focus();
  const onValid = (data: object) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    onFocus(fisrtNameRef);
  }, []);

  return (
    <Shared.KeyboardAvoidingView>
      <Shared.CenterView>
        <Shared.Logo maxWidth={"50%"} />
        <CS.Container>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: "• First Name is required.",
              pattern: RegEx.onlyAlphabet("First Name"),
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Shared.TextInput
                inputRef={fisrtNameRef}
                placeholder="First Name"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                marginBottom={5}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onKeyPress={() => clearErrors("error")}
                onSubmitEditing={() => onFocus(lastNameRef)}
                hasError={Boolean(errors?.firstName?.message)}
              />
            )}
          />
          <Shared.AccentMessage
            type={"error"}
            message={errors?.firstName?.message}
          />

          <Controller
            control={control}
            name="lastName"
            rules={{ pattern: RegEx.onlyAlphabet("Last Name") }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Shared.TextInput
                inputRef={lastNameRef}
                placeholder="Last Name"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                marginBottom={5}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onKeyPress={() => clearErrors("error")}
                onSubmitEditing={() => onFocus(userNameRef)}
                hasError={Boolean(errors?.lastName?.message)}
              />
            )}
          />
          <Shared.AccentMessage
            type={"error"}
            message={errors?.lastName?.message}
          />

          <Controller
            control={control}
            name="userName"
            rules={{
              required: "• Username is required",
              pattern: RegEx.forID("Username"),
              minLength: RegEx.minLength("User Name", 4),
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Shared.TextInput
                inputRef={userNameRef}
                placeholder="Username"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                marginBottom={5}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onKeyPress={() => clearErrors("error")}
                onSubmitEditing={() => onFocus(emailRef)}
                hasError={Boolean(errors?.userName?.message)}
              />
            )}
          />
          <Shared.AccentMessage
            type={"error"}
            message={errors?.userName?.message}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: "• Email is required.",
              pattern: RegEx.foremail(),
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Shared.TextInput
                inputRef={emailRef}
                placeholder="Email"
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                marginBottom={5}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onKeyPress={() => clearErrors("error")}
                onSubmitEditing={() => onFocus(passwordRef)}
                hasError={Boolean(errors?.email?.message)}
              />
            )}
          />
          <Shared.AccentMessage
            type={"error"}
            message={errors?.email?.message}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "• Password is requried.",
              minLength: RegEx.minLength("Password", 4),
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Shared.TextInput
                inputRef={passwordRef}
                placeholder="Password"
                returnKeyType="done"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onKeyPress={() => clearErrors("error")}
                onSubmitEditing={handleSubmit(onValid)}
                hasError={Boolean(errors?.password?.message)}
              />
            )}
          />
          <Shared.AccentMessage
            type={"error"}
            message={errors?.password?.message}
          />

          <Shared.AccentMessage
            type={"error"}
            message={errors?.error?.message}
          />
          <CS.ButtonContainer>
            <Shared.ButtonWithText
              text={"Create Account"}
              disabled={!isValid}
              loading={loading}
              onPress={handleSubmit(onValid)}
            />
          </CS.ButtonContainer>
        </CS.Container>
      </Shared.CenterView>
    </Shared.KeyboardAvoidingView>
  );
};

export default CreateAccount;

// onBlur 작동을 하지 않음
