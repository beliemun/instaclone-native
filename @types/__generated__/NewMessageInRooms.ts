/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewMessageInRooms
// ====================================================

export interface NewMessageInRooms_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  userName: string;
}

export interface NewMessageInRooms {
  __typename: "Message";
  id: number;
  text: string;
  user: NewMessageInRooms_user;
  read: boolean;
  createdAt: string;
}
