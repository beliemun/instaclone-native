import React from "react";
import Shared from "../../Components";
import { useRef } from "react";
import { InputContainer } from "./styles";

const CreateAccount: React.FC = () => {
  const lastNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const onNext = (ref: React.RefObject<HTMLInputElement>) =>
    ref?.current?.focus();
  const onDone = () => alert("Done!");
  return (
    <Shared.KeyboardAvoidingView>
      <Shared.CenterView>
        <Shared.Logo maxWidth={"50%"} />
        <InputContainer>
          <Shared.TextInput
            autoFocus
            placeholder="First Name"
            returnKeyType="next"
            marginBottom={5}
            onSubmitEditing={() => onNext(lastNameRef)}
          />
          <Shared.TextInput
            ref={lastNameRef}
            placeholder="Last Name"
            returnKeyType="next"
            marginBottom={5}
            onSubmitEditing={() => onNext(userNameRef)}
          />
          <Shared.TextInput
            ref={userNameRef}
            placeholder="Username"
            returnKeyType="next"
            marginBottom={5}
            onSubmitEditing={() => onNext(emailRef)}
          />
          <Shared.TextInput
            ref={emailRef}
            placeholder="Email"
            returnKeyType="next"
            keyboardType="email-address"
            marginBottom={5}
            onSubmitEditing={() => onNext(passwordRef)}
          />
          <Shared.TextInput
            ref={passwordRef}
            placeholder="Password"
            returnKeyType="done"
            secureTextEntry={true}
            onSubmitEditing={onDone}
          />
        </InputContainer>
        <Shared.Container marginTop={40}>
          <Shared.ButtonWithText disabled={true} text={"Create Account"} />
        </Shared.Container>
      </Shared.CenterView>
    </Shared.KeyboardAvoidingView>
  );
};

export default CreateAccount;
