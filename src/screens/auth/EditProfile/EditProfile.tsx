import React from "react";
import * as CS from "./styles";
import Shared from "@Components";
import useUser from "~/hooks/useUser";
import { Controller, useForm } from "react-hook-form";
import RegEx from "@common/rules";

interface IFormInput {
  firstName: string;
  lastName: string;
  userName: string;
  bio: string;
  error: string;
}

const EditProfile: React.FC = () => {
  const user = useUser();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      firstName: user.data?.me?.firstName ?? undefined,
      lastName: user.data?.me?.lastName ?? undefined,
      userName: user.data?.me?.userName ?? undefined,
      bio: user.data?.me?.bio ?? undefined,
    },
  });

  const onValid = (data: object) => {
    console.log(data);
  };

  return (
    <CS.Container>
      <CS.Header>
        <CS.AvatarContainer>
          <CS.Avatar source={{ uri: user.data?.me?.avatar ?? undefined }} />
        </CS.AvatarContainer>
        <Shared.LinkWithText text="Change Profile Photo" />
      </CS.Header>
      <CS.Body>
        <CS.InputContainer>
          <CS.Label>Fisrt Name</CS.Label>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: "• First Name is required.",
              pattern: RegEx.onlyAlphabet("First Name"),
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <CS.Input
                placeholder="First Name"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onKeyPress={() => clearErrors("error")}
              />
            )}
          />
        </CS.InputContainer>
        <Shared.AccentMessage
          type={"error"}
          message={errors?.firstName?.message}
        />
        <CS.InputContainer>
          <CS.Label>Last Name</CS.Label>
          <Controller
            control={control}
            name="lastName"
            rules={{
              required: "• Last Name is required.",
              pattern: RegEx.onlyAlphabet("Last Name"),
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <CS.Input
                placeholder="Last Name"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onKeyPress={() => clearErrors("error")}
              />
            )}
          />
        </CS.InputContainer>
        <Shared.AccentMessage
          type={"error"}
          message={errors?.lastName?.message}
        />
        <CS.InputContainer>
          <CS.Label>Username</CS.Label>
          <Controller
            control={control}
            name="userName"
            rules={{
              required: "• Username is required.",
              pattern: RegEx.onlyAlphabet("Username"),
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <CS.Input
                placeholder="Username"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onKeyPress={() => clearErrors("error")}
              />
            )}
          />
        </CS.InputContainer>
        <Shared.AccentMessage
          type={"error"}
          message={errors?.userName?.message}
        />
        <CS.InputContainer>
          <CS.Label>Instroduction</CS.Label>
          <Controller
            control={control}
            name="bio"
            render={({ field: { onBlur, onChange, value } }) => (
              <CS.Input
                placeholder="Instroduction"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onKeyPress={() => clearErrors("error")}
              />
            )}
          />
        </CS.InputContainer>
      </CS.Body>
      <Shared.ButtonWithText
        text="Update"
        onPress={handleSubmit(onValid)}
        disabled={!isValid}
      />
      <Shared.AccentMessage type={"error"} message={errors?.error?.message} />
    </CS.Container>
  );
};

export default EditProfile;
