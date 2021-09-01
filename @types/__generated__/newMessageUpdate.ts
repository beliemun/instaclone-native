/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: newMessageUpdate
// ====================================================

export interface newMessageUpdate_newMessageUpdate_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  userName: string;
}

export interface newMessageUpdate_newMessageUpdate {
  __typename: "Message";
  id: number;
  text: string;
  user: newMessageUpdate_newMessageUpdate_user;
  read: boolean;
}

export interface newMessageUpdate {
  newMessageUpdate: newMessageUpdate_newMessageUpdate | null;
}

export interface newMessageUpdateVariables {
  id: number;
}
