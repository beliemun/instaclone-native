/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFollowers
// ====================================================

export interface seeFollowers_seeFollowers {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface seeFollowers {
  seeFollowers: seeFollowers_seeFollowers[] | null;
}

export interface seeFollowersVariables {
  userName: string;
  offset: number;
  take: number;
}
