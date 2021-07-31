/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_comments_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seeFeed_seeFeed_comments {
  __typename: "Comment";
  id: number;
  user: seeFeed_seeFeed_comments_user;
  text: string;
  isMine: boolean;
  createdAt: string;
}

export interface seeFeed_seeFeed_hashtags_photos {
  __typename: "Photo";
  id: number;
}

export interface seeFeed_seeFeed_hashtags {
  __typename: "Hashtag";
  id: number;
  hashtag: string;
  createdAt: string;
  photos: (seeFeed_seeFeed_hashtags_photos | null)[] | null;
}

export interface seeFeed_seeFeed_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seeFeed_seeFeed {
  __typename: "Photo";
  id: number;
  file: string;
  caption: string | null;
  likeCount: number;
  commentCount: number;
  comments: seeFeed_seeFeed_comments[] | null;
  isLiked: boolean;
  createdAt: string;
  isMine: boolean;
  hashtags: seeFeed_seeFeed_hashtags[] | null;
  user: seeFeed_seeFeed_user;
}

export interface seeFeed {
  seeFeed: seeFeed_seeFeed[] | null;
}

export interface seeFeedVariables {
  offset: number;
}
