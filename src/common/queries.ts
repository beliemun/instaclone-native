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
  query seePhotoLikes($id: Int!, $offset: Int!, $take: Int!) {
    seePhotoLikes(id: $id, offset: $offset, take: $take) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const ME_QUERY = gql`
  query me {
    me {
      firstName
      lastName
      userName
      avatar
      bio
    }
  }
`;

export const SEE_PHOTO_COMMENTS_QUERY = gql`
  query seePhotoComments($id: Int!, $offset: Int!, $take: Int!) {
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

export const SEARCH_PHOTOS_QUERY = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

export const SEE_FOLLOWERS_QUERY = gql`
  query seeFollowers($userName: String!, $offset: Int!, $take: Int!) {
    seeFollowers(userName: $userName, offset: $offset, take: $take) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const SEE_FOLLOWING_QUERY = gql`
  query seeFollowing($userName: String!, $offset: Int!, $take: Int!) {
    seeFollowing(userName: $userName, offset: $offset, take: $take) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      id
      unreadTotal
      lastMessage {
        text
      }
      users {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

// [중요] 캐시를 해야하는 위치에는 아폴로가 인식하기 위해서 반드시 id가 있어야한다.
// id 값을 사용하지 않아도 아폴로 캐시를 위해 넣어놓는 습관을 들이는 것이 좋다.
export const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        text
        user {
          ...UserFragment
        }
        read
      }
      unreadTotal
    }
  }
  ${USER_FRAGMENT}
`;
