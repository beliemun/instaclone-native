/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_photos {
  __typename: "Photo";
  id: number;
  file: string;
  caption: string | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  isMine: boolean;
}

export interface seeProfile_seeProfile {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string | null;
  userName: string;
  bio: string | null;
  avatar: string | null;
  photos: (seeProfile_seeProfile_photos | null)[] | null;
  totalFollowing: number;
  totalFollowers: number;
  totalPhotos: number;
  isMe: boolean;
  isFollowing: boolean;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  userName: string;
}
