/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: readMessageUpdate
// ====================================================

export interface readMessageUpdate_readMessageUpdate_messages_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface readMessageUpdate_readMessageUpdate_messages {
  __typename: "Message";
  id: number;
  text: string;
  user: readMessageUpdate_readMessageUpdate_messages_user;
  read: boolean;
}

export interface readMessageUpdate_readMessageUpdate {
  __typename: "Room";
  id: number;
  messages: (readMessageUpdate_readMessageUpdate_messages | null)[] | null;
  unreadTotal: number;
}

export interface readMessageUpdate {
  readMessageUpdate: readMessageUpdate_readMessageUpdate | null;
}

export interface readMessageUpdateVariables {
  id: number;
}
