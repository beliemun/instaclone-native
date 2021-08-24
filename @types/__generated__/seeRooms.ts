/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRooms
// ====================================================

export interface seeRooms_seeRooms_lastMessage {
  __typename: "Message";
  text: string;
}

export interface seeRooms_seeRooms_users {
  __typename: "User";
  avatar: string | null;
  userName: string;
}

export interface seeRooms_seeRooms {
  __typename: "Room";
  id: number;
  unreadTotal: number;
  lastMessage: seeRooms_seeRooms_lastMessage | null;
  users: (seeRooms_seeRooms_users | null)[] | null;
}

export interface seeRooms {
  seeRooms: (seeRooms_seeRooms | null)[] | null;
}
