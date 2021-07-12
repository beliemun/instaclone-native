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
import { gql, useLazyQuery } from "@apollo/client";
import { searchPhotos } from "types/__generated__/searchPhotos";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const TextInput = styled.TextInput``;

interface IFormInput {
  keyword: string;
  error: string;
}

interface IProps {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}

const Serach: React.FC<IProps> = ({ navigation, route }) => {
  // useQuery는 컴포넌트에 마운트 될 때 자동으로 호출된다.
  // skip를 이용해 실행을 막을 수 있지만 Query문 실행 자체를 막을 수 없다.
  // useLazyQuery는 startQueryFn를 호출하기 전까지 실행되지 않는다.
  const [startQueryFn, { loading, data }] =
    useLazyQuery<searchPhotos>(SEARCH_PHOTOS);
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
