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
import {
  searchPhotos,
  searchPhotosVariables,
  searchPhotos_searchPhotos,
} from "types/__generated__/searchPhotos";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { darkTheme, lightTheme } from "~/common/theme";
import { useState } from "react";

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
  const [keyword, setKeyword] = useState("");
  const colorScheme = useColorScheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<IFormInput>({ mode: "onChange" });

  // useQuery는 컴포넌트에 마운트 될 때 자동으로 호출된다.
  // skip를 이용해 실행을 막을 수 있지만 Query문 실행 자체를 막을 수 없다.
  // useLazyQuery는 startQueryFn를 호출하기 전까지 실행되지 않는다.
  const [startQueryFn, { loading, called, data }] = useLazyQuery<searchPhotos>(
    SEARCH_PHOTOS,
    {
      onCompleted: ({ searchPhotos }) => {
        if (searchPhotos?.length === 0) {
          setError("error", { message: "Could not find anything." });
        }
      },
    }
  );

  const NUMCOLUMNS = 3;
  const { width } = useWindowDimensions();
  const size = width / NUMCOLUMNS;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, []);

  const onValid = (data: searchPhotosVariables) => {
    startQueryFn({
      variables: { keyword: data.keyword },
    });
    setKeyword(data.keyword);
  };

  const SearchBox = () => (
    <Controller
      control={control}
      name="keyword"
      rules={{
        required: "• Please write a keyword.",
        minLength: RegEx.minLength("Keyword", 2),
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
          onKeyPress={() => clearErrors("error")}
          onSubmitEditing={handleSubmit(onValid)}
        />
      )}
    />
  );

  const SearchItem: React.FC<searchPhotos_searchPhotos> = ({ id, file }) => (
    <TouchableOpacity>
      <Image source={{ uri: file }} style={{ width: size, height: size }} />
    </TouchableOpacity>
  );

  const renderResult = () => {
    if (errors.keyword?.message) {
      return (
        <Shared.AccentMessage type="error" message={errors.keyword.message} />
      );
    }
    if (!called) {
      return (
        <Shared.AccentMessage type="info" message={"Search by keyword."} />
      );
    }
    if (loading) {
      return (
        <ActivityIndicator
          color={colorScheme === "light" ? lightTheme.accent : darkTheme.accent}
        />
      );
    }
    if (data?.searchPhotos?.length === 0) {
      return (
        <Shared.AccentMessage type="info" message={errors.error?.message} />
      );
    }
    // 검색 중에 결과물 숨기기
    if (watch("keyword") !== keyword) {
      return <></>;
    }
    return (
      <FlatList
        style={{ width: width }}
        numColumns={NUMCOLUMNS}
        data={data?.searchPhotos}
        renderItem={(item) => <SearchItem {...item.item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  return (
    <Shared.KeyboardAvoidingView>
      <Container
        style={{
          justifyContent: "flex-start",
          margin: -10,
        }}
      >
        {renderResult()}
      </Container>
    </Shared.KeyboardAvoidingView>
  );
};

export default Serach;
