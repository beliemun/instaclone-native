import React, { useState, useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, FlatList } from "react-native";
import * as CS from "./styles";
import Shared from "@Components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageStackParamList } from "types/navigation/auth";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import MessageItem from "~/Components/MessageItem";
import { SEE_ROOM_QUERY } from "~/common/queries";
import { READ_MESSAGES, SEND_MESSAGE_MUTATION } from "~/common/mutations";
import { NEW_MESSAGE_UPDATE, READ_MESSAGE_UPDATE } from "~/common/subscription";

const Room: React.FC = () => {
  const flatListRef = useRef<FlatList<any>>(null);
  const navigation =
    useNavigation<StackNavigationProp<MessageStackParamList>>();
  const {
    params: { id, target },
  } = useRoute<RouteProp<MessageStackParamList, "Room">>();
  const { data, loading, subscribeToMore } = useQuery(SEE_ROOM_QUERY, {
    variables: {
      id,
    },
  });
  const [text, setText] = useState("");
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION
  );
  const [readMessagesMutation] = useMutation(READ_MESSAGES);
  const [subscribing, setSubcribing] = useState(false);
  const { cache } = useApolloClient();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: target?.userName,
      headerBackTitleVisible: false,
    });
  }, []);

  useEffect(() => {
    // 내 방에 들어가면 Rooms에 보이는 unreadTotal을 0으로 변경.
    readMessagesMutation({
      variables: {
        roomId: id,
      },
      update: (cache) => {
        cache.modify({
          id: `Room:${id}`,
          fields: {
            unreadTotal: () => 0,
          },
        });
      },
    });

    if (!subscribing) {
      setSubcribing(true);

      // newMessageUpdate : 새로운 메시지를 받으면 Messaages 캐시 업데이트.
      subscribeToMore({
        document: NEW_MESSAGE_UPDATE,
        variables: {
          id,
        },
        // 조건에 맞으면 data가 업데이트 되어 캐시 업데이트도 당연하게 됨.
        // 강의 처럼 아래와 같이 구현할 경우, 메시지를 보낼 때마다 깜빡거리는 현상이 나타남.
        // updateQuery: (prev, { subscriptionData: { data } }) => {
        //   const { newMessageUpdate: message } = data;
        //   const incomingMessage = cache.writeFragment({
        //     fragment: gql`
        //       fragment NewMessageInRoom on Message {
        //         id
        //         text
        //         user {
        //           id
        //           avatar
        //           userName
        //         }
        //         read
        //         createdAt
        //       }
        //     `,
        //     data: message,
        //   });
        //   cache.modify({
        //     id: `Room:${id}`,
        //     fields: {
        //       messages: (prev: any) => [...prev, incomingMessage],
        //     },
        //   });
        //   flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
        // },
      });

      // 상대방이 방을 들어가면 readMessageUpdate가 실행되고, 나는 메시지를 읽었다는 피드백을 받는다.
      subscribeToMore({
        document: READ_MESSAGE_UPDATE,
        variables: {
          id: id,
        },
      });
    }
  }, [data?.seeRoom]);

  const onSubmit = () => {
    if (sendingMessage || text === "") return;
    sendMessageMutation({
      variables: {
        text,
        roomId: id,
      },
    });
    // createOpimisticCache();
    setText("");
  };

  // const createOpimisticCache = () => {
  //   console.log("createOpimisticCache");
  //   const data = {
  //     __typename: "Message",
  //     id: "New",
  //     text,
  //     isMine: true,
  //     createAt: Date.now(),
  //     user: undefined,
  //   };
  //   const incoming = cache.writeFragment({
  //     fragment: gql`
  //       fragment OptimisticMessage on Message {
  //         id
  //         text
  //         user {
  //           id
  //           avatar
  //           userName
  //         }
  //         read
  //         createdAt
  //       }
  //     `,
  //     data,
  //   });
  //   cache.modify({
  //     id: `Room:${id}`,
  //     fields: {
  //       messages: (prev: any) => [...prev, incoming],
  //     },
  //   });
  // };

  // const removeOpimisticCache = () => {
  //   cache.modify({
  //     id: `Room:${id}`,
  //     fields: {
  //       messages: (prev: any) => prev.slice(0, -1),
  //     },
  //   });
  // };

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : -250}
      style={{ flex: 1 }}
    >
      <Shared.LoadingLayout loading={loading}>
        <CS.Container>
          <FlatList
            inverted
            ref={flatListRef}
            data={data?.seeRoom?.messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MessageItem
                message={item}
                isMine={item.user.userName !== target?.userName}
                read={item.read}
                createdAt={Number(item.createdAt)}
              />
            )}
            style={{ width: "100%", backgroundColor: "white" }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          />
          <CS.InputContainer>
            <CS.Input
              placeholder="Write a comment.."
              placeholderTextColor="#c0c0c0"
              onSubmitEditing={onSubmit}
              onChangeText={(text) => setText(text)}
              returnKeyType="send"
              returnKeyLabel="Send Message"
              autoCorrect={false}
              value={text}
            />
          </CS.InputContainer>
        </CS.Container>
      </Shared.LoadingLayout>
    </KeyboardAvoidingView>
  );
};

export default Room;
