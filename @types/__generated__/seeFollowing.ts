/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFollowing
// ====================================================

export interface seeFollowing_seeFollowing {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seeFollowing {
  seeFollowing: seeFollowing_seeFollowing[] | null;
}

export interface seeFollowingVariables {
  userName: string;
  offset: number;
  take: number;
}
