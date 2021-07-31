/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seePhoto
// ====================================================

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
  user: seePhoto_seePhoto_comments_user;
  text: string;
  isMine: boolean;
  createdAt: string;
}

export interface seePhoto_seePhoto_hashtags_photos {
  __typename: "Photo";
  id: number;
}

export interface seePhoto_seePhoto_hashtags {
  __typename: "Hashtag";
  id: number;
  hashtag: string;
  createdAt: string;
  photos: (seePhoto_seePhoto_hashtags_photos | null)[] | null;
}

export interface seePhoto_seePhoto_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seePhoto_seePhoto {
  __typename: "Photo";
  id: number;
  file: string;
  caption: string | null;
  likeCount: number;
  commentCount: number;
  comments: seePhoto_seePhoto_comments[] | null;
  isLiked: boolean;
  createdAt: string;
  isMine: boolean;
  hashtags: seePhoto_seePhoto_hashtags[] | null;
  user: seePhoto_seePhoto_user;
}

export interface seePhoto {
  seePhoto: seePhoto_seePhoto | null;
}

export interface seePhotoVariables {
  id: number;
}
