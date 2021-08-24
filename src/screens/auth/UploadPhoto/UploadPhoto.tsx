import React, { useEffect } from "react";
import * as CS from "./styles";
import Shared from "@Components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "types/navigation/auth";
import { ActivityIndicator } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { UPLOAD_PHOTO_MUTATION } from "~/common/mutations";
import { ReactNativeFile } from "apollo-upload-client";

interface IFormInput {
  caption: string;
}

const UploadPhoto: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const route = useRoute<RouteProp<AuthStackParamList, "UploadPhoto">>();
  const { control, handleSubmit } = useForm<IFormInput>();
  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: (cache, result) => {
        const {
          data: { uploadPhoto },
        } = result;

        if (uploadPhoto.id) {
          cache.modify({
            id: `ROOT_QUERY`,
            fields: {
              seeFeed: (prev) => [uploadPhoto, ...prev],
            },
          });
          navigation.navigate("Tabs");
        }
      },
    }
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? Loading : HeaderRight,
      ...(loading && { headerLeft: () => null }), // [중요] Conditional Object 기법
    });
  }, [loading]);

  const HeaderRight = () => (
    <CS.HeaderRight onPress={handleSubmit(onValid)}>
      <CS.HeaderRightText>Share</CS.HeaderRightText>
    </CS.HeaderRight>
  );

  const onValid = (data: IFormInput) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });

    uploadPhotoMutation({
      variables: { file, caption: data.caption },
    });
  };

  const Loading = () => (
    <ActivityIndicator size="small" style={{ marginRight: 5 }} />
  );

  return (
    <Shared.KeyboardAvoidingView>
      <CS.Container>
        <CS.Thumnail source={{ uri: route.params.file }} />
        <Controller
          control={control}
          name="caption"
          render={({ field: { onBlur, onChange, value } }) => (
            <CS.Input
              placeholder="Write a caption"
              returnKeyType="done"
              textAlignVertical="top"
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline={true}
              editable={!loading}
              isUploading={loading}
              blurOnSubmit={true} // [중요] 인풋텍스트에서 줄내림 방지
            />
          )}
        />
      </CS.Container>
    </Shared.KeyboardAvoidingView>
  );
};

export default UploadPhoto;
