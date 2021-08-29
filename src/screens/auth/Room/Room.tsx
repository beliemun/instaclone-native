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
import { SEND_MESSAGE_MUTATION } from "~/common/mutations";
import { ROOM_UPDATES } from "~/common/subscription";
import { roomUpdates } from "types/__generated__/roomUpdates";
import useUser from "~/hooks/useUser";

const Room: React.FC = () => {
  const loggedInUser = useUser();
  const flatListRef = useRef<FlatList<any>>(null);
  const { cache } = useApolloClient();
  const navigation =
    useNavigation<StackNavigationProp<MessageStackParamList>>();
  const {
    params: { id, target },
  } = useRoute<RouteProp<MessageStackParamList, "Room">>();
  const {
    data,
    loading: seeRoomLoading,
    subscribeToMore,
  } = useQuery(SEE_ROOM_QUERY, {
    variables: {
      id,
    },
  });
  const [text, setText] = useState("");
  const [sendMessageMutation, { loading: sendMessageLoading }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      // update: (cache, result) => {
      //   const {
      //     data: {
      //       sendMessage: { ok, id },
      //     },
      //   } = result;
      //   if (!ok || !loggedInUser.data) return;
      //   const messageObj = {
      //     __typename: "Message",
      //     id,
      //     text,
      //     user: {
      //       userName: loggedInUser.data?.me?.userName,
      //       avatar: loggedInUser.data?.me?.avatar,
      //     },
      //     read: true,
      //   };
      //   // 캐시에 올라갈 데이터 형태로 만듬
      //   const messageFragment = cache.writeFragment({
      //     fragment: gql`
      //       fragment NewMessage on Message {
      //         id
      //         text
      //         user {
      //           id
      //           avatar
      //           userName
      //         }
      //         read
      //       }
      //     `,
      //     data: messageObj,
      //   });
      //   cache.modify({
      //     id: `Room:${id}`,
      //     fields: {
      //       messages: (prev) => [...prev, messageFragment],
      //     },
      //   });
      // },
    }
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: target?.userName,
      headerBackTitleVisible: false,
    });
  }, []);

  useEffect(() => {
    if (data?.seeRoom) {
      subscribeToMore({
        document: ROOM_UPDATES,
        variables: {
          id,
        },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          const { roomUpdates: message } = data as roomUpdates;
          const incomingMessage = cache.writeFragment({
            fragment: gql`
              fragment NewMessage on Message {
                id
                text
                user {
                  id
                  avatar
                  userName
                }
                read
              }
            `,
            data: message,
          });
          cache.modify({
            id: `Room:${id}`,
            fields: {
              messages: (prev: any) => {
                const existingMessage = prev.find(
                  (aMessage: any) => aMessage.__ref === incomingMessage?.__ref
                );

                if (existingMessage) {
                  return prev;
                }
                return [...prev, incomingMessage];
              },
            },
          });
          flatListRef.current?.scrollToOffset({ offset: 0 });
        },
      });
    }
  }, [data]);

  const onSubmit = () => {
    if (sendMessageLoading) return;
    sendMessageMutation({
      variables: {
        text,
        roomId: id,
      },
    });
    setText("");
  };

  // data가 읽기 전용이므로 reverse하기 위해 배열을 복사한다.
  const messages = [...(data?.seeRoom?.messages ?? [])];

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : -250}
      style={{ flex: 1 }}
    >
      <Shared.LoadingLayout loading={seeRoomLoading}>
        <CS.Container>
          <FlatList
            inverted
            ref={flatListRef}
            data={messages.reverse()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MessageItem
                message={item}
                isMine={item.user.userName !== target?.userName}
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
