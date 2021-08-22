import React, { useState, useEffect, useRef } from "react";
import * as CS from "./styles";
import Shared from "@Components";
import { Camera } from "expo-camera";
import { useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import Slider from "@react-native-community/slider";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "types/navigation/auth";
import { Alert } from "react-native";

const TakePhoto: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const { width } = useWindowDimensions();
  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState("");
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const camera = useRef<Camera>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState("");

  useEffect(() => {
    getPhotos();
    getCameraPermissions();
  }, [ok]);

  const getCameraPermissions = async () => {
    const { granted, canAskAgain } = await Camera.requestPermissionsAsync();
    if (granted !== false && canAskAgain) {
      const { granted } = await Camera.requestPermissionsAsync();
      if (granted !== false) {
        setOk(true);
      }
    } else if (granted !== false) {
      setOk(true);
    }
  };

  const getPhotos = async () => {
    if (!ok) return;
    const { assets } = await MediaLibrary.getAssetsAsync({ first: 1 });
    setPhoto(assets[0]?.uri);
  };

  const changeCameraType = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
  };

  const onValueChange = (e: number) => {
    setZoom(e);
  };

  const onFlashModeChange = (e: any) => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      // 사진을 바로 저장하고 반환함. saveAssetAsync()는 저장하고 반환하지 않음.
      // const asset = await MediaLibrary.createAssetAsync(uri);
      setTakenPhoto(uri);
    }
  };

  const onCameraReady = () => setCameraReady(true);

  // [중요]특정 화면을 보고 있는지 알고 싶을 때 사용한다.
  // const isFocused = useIsFocused();

  const goToUpload = async (save: boolean) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    } else {
      console.log("Will upload", takenPhoto);
    }
  };

  const onUpload = () => {
    Alert.alert("Save Photo", "Save photo & upload or just upload?", [
      { text: "Save & Upload", onPress: () => goToUpload(true) },
      { text: "Just Upload", onPress: () => goToUpload(false) },
    ]);
  };

  return (
    <CS.Container>
      <CS.Top>
        <CS.Buttons justifyContent={"space-between"}>
          <CS.Button
            onPress={() => {
              setTakenPhoto("");
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" color="white" size={26} />
          </CS.Button>
          {takenPhoto === "" && (
            <CS.Button onPress={onFlashModeChange}>
              <Ionicons
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash-off"
                    : flashMode === Camera.Constants.FlashMode.on
                    ? "flash"
                    : flashMode === Camera.Constants.FlashMode.auto
                    ? "eye"
                    : "eye"
                }
                color="white"
                size={26}
              />
            </CS.Button>
          )}
        </CS.Buttons>
      </CS.Top>
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          style={{ width, height: width }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CS.Grid />
        </Camera>
      ) : (
        <CS.TakenPhoto source={{ uri: takenPhoto }} width={width} />
      )}
      <CS.Bottom>
        {takenPhoto === "" ? (
          <>
            <CS.SliderContianer>
              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="rgba(255,255,255,0.2)"
                onValueChange={onValueChange}
              />
            </CS.SliderContianer>
            <CS.Buttons justifyContent={"space-evenly"}>
              <CS.Button onPress={pickImage}>
                {photo ? <CS.PhotoInAlbum source={{ uri: photo }} /> : null}
              </CS.Button>
              <CS.Sutter onPress={takePhoto}>
                <CS.SutterInside />
              </CS.Sutter>
              <CS.Button onPress={changeCameraType}>
                <Ionicons
                  name="camera-reverse-outline"
                  color="white"
                  size={26}
                />
              </CS.Button>
            </CS.Buttons>
          </>
        ) : (
          <CS.Buttons justifyContent={"space-evenly"}>
            <CS.Button onPress={() => setTakenPhoto("")}>
              <Ionicons name="close-outline" color="white" size={26} />
            </CS.Button>
            <CS.Button onPress={onUpload}>
              <Ionicons name="checkmark" color="white" size={26} />
            </CS.Button>
          </CS.Buttons>
        )}
      </CS.Bottom>
    </CS.Container>
  );
};

export default TakePhoto;
