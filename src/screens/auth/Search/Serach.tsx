import React, { useEffect } from "react";
import Shared from "@Components";
import { Container } from "./styles";
import {
  SearchScreenNavigationProp,
  SearchScreenRouteProp,
} from "types/navigation/auth";
import styled from "styled-components/native";
import RegEx from "@common/rules";
import { Controller, useForm } from "react-hook-form";

interface IProps {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}

const TextInput = styled.TextInput``;

interface IFormInput {
  keyword: string;
  error: string;
}

const Serach: React.FC<IProps> = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ mode: "onChange" });
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, []);

  const onValid = (data: object) => {
    console.log(isValid, data);
  };

  const SearchBox = () => (
    <Controller
      control={control}
      name="keyword"
      rules={{
        minLength: RegEx.minLength("Keyword", 4),
      }}
      render={({ field: { onBlur, onChange, value } }) => (
        <TextInput
          placeholder="Search Photos"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          returnKeyLabel="Search"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          onSubmitEditing={handleSubmit(onValid)}
        />
      )}
    />
  );

  return (
    <Shared.KeyboardAvoidingView>
      <Container>
        <Shared.AccentMessage type="info" message={errors?.keyword?.message} />
      </Container>
    </Shared.KeyboardAvoidingView>
  );
};

export default Serach;
