/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seePhotoComments
// ====================================================

export interface seePhotoComments_seePhotoComments_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seePhotoComments_seePhotoComments {
  __typename: "Comment";
  id: number;
  text: string;
  isMine: boolean;
  createdAt: string;
  user: seePhotoComments_seePhotoComments_user;
}

export interface seePhotoComments {
  seePhotoComments: seePhotoComments_seePhotoComments[] | null;
}

export interface seePhotoCommentsVariables {
  id: number;
  offset: number;
  take: number;
}
