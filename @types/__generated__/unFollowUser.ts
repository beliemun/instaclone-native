/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unfollowUser
// ====================================================

export interface unfollowUser_unfollowUser {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface unfollowUser {
  unfollowUser: unfollowUser_unfollowUser | null;
}

export interface unfollowUserVariables {
  userName: string;
}
