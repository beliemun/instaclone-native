/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_user {
  __typename: "User";
  userName: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed_comments_user {
  __typename: "User";
  userName: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed_comments {
  __typename: "Comment";
  id: number;
  user: seeFeed_seeFeed_comments_user;
  text: string;
  isMine: boolean;
  createdAt: string;
}

export interface seeFeed_seeFeed {
  __typename: "Photo";
  id: number;
  file: string;
  caption: string | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  isMine: boolean;
  user: seeFeed_seeFeed_user;
  comments: (seeFeed_seeFeed_comments | null)[] | null;
}

export interface seeFeed {
  seeFeed: seeFeed_seeFeed[] | null;
}
