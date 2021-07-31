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

export const HASHTAG_FRAGMENT = gql`
  fragment HashtagFragment on Hashtag {
    id
    hashtag
    createdAt
    photos {
      id
    }
  }
`;

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    caption
    likeCount
    commentCount
    comments {
      ...CommentFragment
    }
    isLiked
    createdAt
    isMine
    hashtags {
      ...HashtagFragment
    }
  }
  ${USER_FRAGMENT}
  ${COMMENT_FRAGMENT}
  ${HASHTAG_FRAGMENT}
`;
