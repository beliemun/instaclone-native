/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: uploadPhoto
// ====================================================

export interface uploadPhoto_uploadPhoto_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface uploadPhoto_uploadPhoto {
  __typename: "Photo";
  id: number;
  file: string;
  caption: string | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  isMine: boolean;
  user: uploadPhoto_uploadPhoto_user;
}

export interface uploadPhoto {
  uploadPhoto: uploadPhoto_uploadPhoto | null;
}

export interface uploadPhotoVariables {
  file: any;
  caption?: string | null;
}
