/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OptimisticMessage
// ====================================================

export interface OptimisticMessage_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  userName: string;
}

export interface OptimisticMessage {
  __typename: "Message";
  id: number;
  text: string;
  user: OptimisticMessage_user;
  read: boolean;
  createdAt: string;
}
