/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRoom
// ====================================================

export interface seeRoom_seeRoom_messages_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  userName: string;
}

export interface seeRoom_seeRoom_messages {
  __typename: "Message";
  id: number;
  text: string;
  user: seeRoom_seeRoom_messages_user;
  read: boolean;
}

export interface seeRoom_seeRoom {
  __typename: "Room";
  id: number;
  messages: (seeRoom_seeRoom_messages | null)[] | null;
}

export interface seeRoom {
  seeRoom: seeRoom_seeRoom | null;
}

export interface seeRoomVariables {
  id: number;
}
