/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewMessageInRoom
// ====================================================

export interface NewMessageInRoom_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  userName: string;
}

export interface NewMessageInRoom {
  __typename: "Message";
  id: number;
  text: string;
  user: NewMessageInRoom_user;
  read: boolean;
  createdAt: string;
}
