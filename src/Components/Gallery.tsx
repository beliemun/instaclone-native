import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { AuthStackParamList } from "types/navigation/auth";
import {
  searchPhotos,
  searchPhotos_searchPhotos,
} from "types/__generated__/searchPhotos";
import { seeProfile_seePhotos } from "types/__generated__/seeProfile";

interface IPhoto {
  __typename: "Photo";
  id: number;
  file: string;
}

interface IProps {
  navigation: StackNavigationProp<AuthStackParamList>;
  data: IPhoto[];
  headerComponent?: React.FC | null;
}

const Gallery: React.FC<IProps> = ({ navigation, data, headerComponent }) => {
  const NUMCOLUMNS = 3;
  const { width } = useWindowDimensions();
  const size = width / NUMCOLUMNS;

  const SearchItem: React.FC<searchPhotos_searchPhotos> = ({ id, file }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Photo", { id })}>
      <Image source={{ uri: file }} style={{ width: size, height: size }} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={{ width: width }}
      numColumns={NUMCOLUMNS}
      data={data}
      renderItem={(item) => <SearchItem {...item.item} />}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={headerComponent}
      ListHeaderComponentStyle={{ flex: 1 }}
    />
  );
};

export default Gallery;
