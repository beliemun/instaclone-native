import { gql } from "@apollo/client";

export const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
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
