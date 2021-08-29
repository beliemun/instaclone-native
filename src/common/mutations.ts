import { gql } from "@apollo/client";
import { PHOTO_FRAGMENT } from "./fragments";

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

export const FOLLOWUSER_MUTATION = gql`
  mutation followUser($userName: String!) {
    followUser(userName: $userName) {
      ok
      error
    }
  }
`;

export const UNFOLLOWUSER_MUTATION = gql`
  mutation unfollowUser($userName: String!) {
    unfollowUser(userName: $userName) {
      ok
      error
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $text: String!) {
    createComment(photoId: $photoId, text: $text) {
      ok
      error
      id
    }
  }
`;

export const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...PhotoFragment
    }
  }
  ${PHOTO_FRAGMENT}
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($text: String!, $roomId: Int, $userId: Int) {
    sendMessage(text: $text, roomId: $roomId, userId: $userId) {
      ok
      error
      id
    }
  }
`;
