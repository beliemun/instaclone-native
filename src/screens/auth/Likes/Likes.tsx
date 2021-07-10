import React from "react";
import { Container } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  LikesScreenNavigationProp,
  LikesScreenRouteProp,
} from "types/navigation/auth";
import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "@common/fragments";

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const Likes: React.FC = () => {
  const navigation = useNavigation<LikesScreenNavigationProp>();
  const route = useRoute<LikesScreenRouteProp>();

  console.log(route);

  return <Container></Container>;
};

export default Likes;
