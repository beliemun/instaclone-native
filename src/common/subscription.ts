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
        createdAt
      }
      unreadTotal
      createdAt
    }
  }
  ${USER_FRAGMENT}
`;

/*
[중요]
subscribeToMore() 안에는
{document,variables} 긜고 {updateQuery} 이렇게 두 개의 agrs가 있는데,

variables에 전달된 값에 따라 실행된 document가 조건에 맞게 실행될 경우,
subscribeToMore를 제공한 Query의 data가 업데이트되며,

document를 publish할 때 싣어줬던 data가
updateQuery에서 subscriptionData로 반환되고
이것을 이용해 캐시 업데이트로 사용한다.
*/
