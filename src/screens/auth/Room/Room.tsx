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
import { NEW_MESSAGE_UPDATE } from "~/common/subscription";

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
  const { cache } = useApolloClient();
  const [subscribing, setSubcribing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: target?.userName,
      headerBackTitleVisible: false,
    });
  }, []);

  useEffect(() => {
    if (!subscribing) {
      setSubcribing(true);
      readMessagesMutation({
        variables: {
          roomId: id,
        },
      });
      subscribeToMore({
        document: NEW_MESSAGE_UPDATE,
        variables: {
          id,
        },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          const { newMessageUpdate: message } = data;
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
                return [...prev, incomingMessage];
              },
            },
          });
          flatListRef.current?.scrollToOffset({ offset: 0 });
        },
      });
    }
  }, [data?.seeRoom]);

  const onSubmit = () => {
    if (sendingMessage) return;
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
      <Shared.LoadingLayout loading={loading}>
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
