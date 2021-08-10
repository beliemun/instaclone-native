/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string | null;
  userName: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  totalFollowing: number;
  totalFollowers: number;
  totalPhotos: number;
  isMe: boolean;
  isFollowing: boolean;
}

export interface seeProfile_seePhotos {
  __typename: "Photo";
  id: number;
  file: string;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
  seePhotos: seeProfile_seePhotos[] | null;
}

export interface seeProfileVariables {
  userName: string;
}
