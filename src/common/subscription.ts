import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "./fragments";

export const NEW_MESSAGE_UPDATE = gql`
  subscription newMessageUpdate($id: Int!) {
    newMessageUpdate(id: $id) {
      id
      text
      user {
        id
        avatar
        userName
      }
      read
    }
  }
`;

export const READ_MESSAGE_UPDATE = gql`
  subscription readMessageUpdate($id: Int!) {
    readMessageUpdate(id: $id) {
      id
      messages {
        id
        text
        user {
          ...UserFragment
        }
        read
      }
      unreadTotal
    }
  }
  ${USER_FRAGMENT}
`;
