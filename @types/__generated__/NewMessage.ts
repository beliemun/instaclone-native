/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewMessage
// ====================================================

export interface NewMessage_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  userName: string;
}

export interface NewMessage {
  __typename: "Message";
  id: number;
  text: string;
  user: NewMessage_user;
  read: boolean;
}
