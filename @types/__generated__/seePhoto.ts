/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seePhoto
// ====================================================

export interface seePhoto_seePhoto_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seePhoto_seePhoto_comments_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seePhoto_seePhoto_comments {
  __typename: "Comment";
  id: number;
  text: string;
  isMine: boolean;
  createdAt: string;
  user: seePhoto_seePhoto_comments_user;
}

export interface seePhoto_seePhoto {
  __typename: "Photo";
  id: number;
  file: string;
  caption: string | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  isMine: boolean;
  user: seePhoto_seePhoto_user;
  comments: seePhoto_seePhoto_comments[] | null;
}

export interface seePhoto {
  seePhoto: seePhoto_seePhoto | null;
}

export interface seePhotoVariables {
  id: number;
}
