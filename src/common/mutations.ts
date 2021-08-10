import { gql } from "@apollo/client";

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
