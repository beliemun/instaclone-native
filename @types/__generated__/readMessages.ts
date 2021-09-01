/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: readMessages
// ====================================================

export interface readMessages_readMessages {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface readMessages {
  readMessages: readMessages_readMessages;
}

export interface readMessagesVariables {
  roomId: number;
}
