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
}

export interface seePhotoComments_seePhotoComments {
  __typename: "Comment";
  id: number;
  user: seePhotoComments_seePhotoComments_user;
  text: string;
}

export interface seePhotoComments {
  seePhotoComments: seePhotoComments_seePhotoComments[] | null;
}

export interface seePhotoCommentsVariables {
  id: number;
  offset: number;
}
