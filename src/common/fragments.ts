import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    userName
    avatar
    isFollowing
    isMe
  }
`;

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    caption
    likeCount
    commentCount
    isLiked
    createdAt
    isMine
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      ...UserFragment
    }
    text
    isMine
    createdAt
  }
  ${USER_FRAGMENT}
`;
