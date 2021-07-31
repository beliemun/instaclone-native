import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT, USER_FRAGMENT } from "./fragments";

export const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        ...UserFragment
      }
      comments {
        ...CommentFragment
      }
    }
  }
  ${USER_FRAGMENT}
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        ...UserFragment
      }
      comments {
        ...CommentFragment
      }
    }
  }
  ${USER_FRAGMENT}
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!, $offset: Int!) {
    seePhotoLikes(id: $id, offset: $offset) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const ME_QUERY = gql`
  query me {
    me {
      userName
      avatar
    }
  }
`;

export const SEE_PHOTO_COMMENTS_QUERY = gql`
  query seePhotoComments($id: Int!, $offset: Int!) {
    seePhotoComments(id: $id, offset: $offset) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;
