import React, { useEffect, useState } from "react";
import * as CS from "./styles";
import Shared from "@Components";
import * as MediaLibrary from "expo-media-library";
import { FlatList } from "react-native-gesture-handler";
import { useWindowDimensions, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NUMCOLUMNS = 3;

const SelectPhoto: React.FC = () => {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [last, setLast] = useState("");
  const [chosenPhoto, setChosenPhoto] = useState("");
  const { width } = useWindowDimensions();
  const size = width / NUMCOLUMNS - 2;

  const getPermissions = async () => {
    const { granted, canAskAgain } =
      await MediaLibrary.requestPermissionsAsync();
    if (granted !== false && canAskAgain) {
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (granted !== false) {
        setOk(true);
      }
    } else if (granted !== false) {
      setOk(true);
    }
  };
  const getPhotos = async () => {
    console.log("call");
    if (!ok) return;
    const { assets, endCursor } =
      last === ""
        ? await MediaLibrary.getAssetsAsync()
        : await MediaLibrary.getAssetsAsync({
            first: 24,
            after: last,
          });
    setPhotos((prev) => [...prev, ...assets]);
    setLast(endCursor);
  };

  useEffect(() => {
    getPermissions();
    getPhotos();
  }, [ok]);

  useEffect(() => {
    setChosenPhoto(photos[0]?.uri);
  }, [photos]);

  const choosePhoto = (uri: string) => {
    setChosenPhoto(uri);
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <CS.ImageContainer onPress={() => choosePhoto(item.uri)}>
        <CS.Image source={{ uri: item.uri }} width={size} />
        <CS.IconContainer>
          <Ionicons name="checkmark-circle" color="white" size={20} />
        </CS.IconContainer>
      </CS.ImageContainer>
    );
  };

  return (
    <CS.Container>
      <CS.Top>
        {chosenPhoto !== "" ? (
          <CS.Target source={{ uri: chosenPhoto }} />
        ) : null}
      </CS.Top>
      <CS.Bottom>
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={NUMCOLUMNS}
          ItemSeparatorComponent={() => <View style={{ height: 3 }}></View>}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          onEndReached={() => getPhotos()}
        />
      </CS.Bottom>
    </CS.Container>
  );
};

export default SelectPhoto;
