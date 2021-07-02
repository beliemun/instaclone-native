import React, { useRef, useEffect } from "react";
import { InputContainer } from "./styles";
import Shared from "../../Components";
import { useForm, Controller } from "react-hook-form";
import RegEx from "../../common/rules";

interface IFormInput {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  error: string;
}

const CreateAccount: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IFormInput>({ mode: "onChange" });

  const fisrtNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onFocus = (ref: any) => ref?.current?.focus();
  const onValid = (data: object) => {
    console.log(data);
  };

  useEffect(() => {
    onFocus(fisrtNameRef);
  }, []);

  return (
    <Shared.KeyboardAvoidingView>
      <Shared.CenterView>
        <Shared.Logo maxWidth={"50%"} />
        <InputContainer>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: "• First Name is required.",
              pattern: RegEx.onlyAlphabet("First Name"),
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Shared.Input
                inputRef={fisrtNameRef}
                placeholder="First Name"
                returnKeyType="next"
                autoCapitalize="none"
                marginBottom={5}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
              <Shared.Input
                inputRef={lastNameRef}
                placeholder="Last Name"
                returnKeyType="next"
                autoCapitalize="none"
                marginBottom={5}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
              <Shared.Input
                inputRef={userNameRef}
                placeholder="Username"
                returnKeyType="next"
                autoCapitalize="none"
                marginBottom={5}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
              <Shared.Input
                inputRef={emailRef}
                placeholder="Email"
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                marginBottom={5}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
              <Shared.Input
                inputRef={passwordRef}
                placeholder="Password"
                returnKeyType="done"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(onValid)}
                hasError={Boolean(errors?.password?.message)}
              />
            )}
          />
          <Shared.AccentMessage
            type={"error"}
            message={errors?.password?.message}
          />

          <Shared.Container marginTop={30}>
            <Shared.ButtonWithText
              text={"Create Account"}
              disabled={!isValid}
              loading={false}
              onPress={handleSubmit(onValid)}
            />
          </Shared.Container>
        </InputContainer>
      </Shared.CenterView>
    </Shared.KeyboardAvoidingView>
  );
};

export default CreateAccount;

// onBlur 작동을 하지 않음
