/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeLatestComments
// ====================================================

export interface seeLatestComments_seeLatestComments_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface seeLatestComments_seeLatestComments {
  __typename: "Comment";
  user: seeLatestComments_seeLatestComments_user;
  text: string;
  createdAt: string;
}

export interface seeLatestComments {
  seeLatestComments: seeLatestComments_seeLatestComments[] | null;
}

export interface seeLatestCommentsVariables {
  id: number;
  take: number;
}
