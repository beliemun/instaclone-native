/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seePhotoLikes
// ====================================================

export interface seePhotoLikes_seePhotoLikes {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seePhotoLikes {
  seePhotoLikes: seePhotoLikes_seePhotoLikes[] | null;
}

export interface seePhotoLikesVariables {
  id: number;
  offset: number;
}
