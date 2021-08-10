import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT, USER_FRAGMENT } from "./fragments";

export const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      comments {
        ...CommentFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      comments {
        ...CommentFragment
      }
    }
  }
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
  query seePhotoComments($id: Int!, $offset: Int!, $take: Int) {
    seePhotoComments(id: $id, offset: $offset, take: $take) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const SEE_PROFILE_QUERY = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      id
      firstName
      lastName
      userName
      email
      bio
      avatar
      totalFollowing
      totalFollowers
      totalPhotos
      isMe
      isFollowing
    }
    seePhotos(userName: $userName) {
      id
      file
    }
  }
`;

export const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;
