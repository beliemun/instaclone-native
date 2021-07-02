import React, { useRef } from "react";
import { InputContainer } from "./styles";
import Shared from "../../Components";
import {
  LoginScreenNavigationProp,
  LoginScreenRouteProp,
} from "../../@types/navigation/unAuth";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import RegEx from "../../common/rules";

interface Props {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

interface IFormInput {
  userName: string;
  password: string;
  error: string;
}

const Login: React.FC<Props> = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onFocus = (ref: any) => ref?.current?.focus();
  const onValid = (data: object) => {
    console.log(data);
  };

  useEffect(() => {
    onFocus(userNameRef); // 안드로이드에서 autoFocus가 작동하지 않아 작성 됨
  }, []);

  return (
    <Shared.KeyboardAvoidingView>
      <Shared.CenterView>
        <Shared.Logo maxWidth={"50%"} />
        <InputContainer>
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
                onSubmitEditing={() => onFocus(passwordRef)}
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
            name={"password"}
            rules={{
              required: "• Password is requried.",
              minLength: RegEx.minLength("Password", 4),
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Shared.Input
                secureTextEntry
                inputRef={passwordRef}
                placeholder="Password"
                returnKeyType="done"
                marginBottom={5}
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
              text={"Login"}
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

export default Login;
