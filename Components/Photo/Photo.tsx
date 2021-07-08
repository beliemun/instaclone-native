import React from "react";
import { useWindowDimensions, Text } from "react-native";
import { seeFeed_seeFeed } from "../../@types/__generated__/seeFeed";
import {
  Container,
  Header,
  Avatar,
  Username,
  File,
  Actions,
  Action,
  Footer,
  Likes,
  Caption,
  CommentCount,
  Comment,
} from "./styles";
import Shared from "../../Components";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../../common/theme";
import { useNavigation } from "@react-navigation/native";
import { FeedScreenNavigationProp } from "../../@types/navigation/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

const renderFilterdCaption = (text: string) => {
  let origin = text.replace(/#/gi, " #").replace(/  /gi, " ").trim();
  const regEx = /#[a-zA-Z가-힣\u0E00-\u0E7Fぁ-んァ-ヾ一-龯a-záéíóúüñç]+/;
  const result = origin.split(" ").map((word, index) => {
    if (regEx.test(word)) {
      const obj = word.match(regEx) ?? [];
      if (obj[0] === word) {
        // 해시태그가 정규표현식에 완전히 일치할 경우.
        // 예) #天気 #ビスを展開
        return <Shared.LinkWithText key={index} text={`${word} `} />;
      } else {
        // 정규표현식에 일치하지 않는 문자 포함 시
        // 예) #天気、 #スポーツ?? #ビスを展開。
        const rest = word.replace(obj[0], "");
        return <Shared.LinkWithText key={index} text={obj[0]} />;
      }
    } else {
      return <Text key={index}>{`${word} `}</Text>;
    }
  });
  return result;
};

const Photo: React.FC<seeFeed_seeFeed> = ({
  id,
  user,
  file,
  caption,
  likeCount,
  comments,
  commentCount,
  isMine,
  isLiked,
}) => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const navigation = useNavigation<FeedScreenNavigationProp>();

  return (
    <Container width={width}>
      <Header onPress={() => navigation.navigate("Profile")}>
        <Avatar source={{ uri: user.avatar ?? undefined }} />
        <Username>{user.userName}</Username>
      </Header>
      <File source={{ uri: file }} width={width} height={width} />
      <Footer>
        <Actions>
          <Action>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={
                isLiked
                  ? "tomato"
                  : colorScheme === "light"
                  ? lightTheme.color
                  : darkTheme.color
              }
              size={26}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons
              name="chatbubble-outline"
              color={
                colorScheme === "light" ? lightTheme.color : darkTheme.color
              }
              size={26}
            />
          </Action>
          <Action>
            <Ionicons
              name="paper-plane-outline"
              color={
                colorScheme === "light" ? lightTheme.color : darkTheme.color
              }
              size={26}
            />
          </Action>
        </Actions>
        {likeCount !== 0 && (
          <Shared.Link onPress={() => navigation.navigate("Likes")}>
            <Likes>
              {likeCount}
              {likeCount === 1 ? " like" : " likes"}
            </Likes>
          </Shared.Link>
        )}
        {caption && (
          <Caption>
            <Shared.Link onPress={() => navigation.navigate("Profile")}>
              <Username>{user.userName}</Username>
            </Shared.Link>
            {renderFilterdCaption(caption)}
          </Caption>
        )}
        {commentCount !== 0 && (
          <CommentCount>
            {commentCount}
            {commentCount === 1 ? " comment" : " comments"}
          </CommentCount>
        )}
      </Footer>
    </Container>
  );
};

export default Photo;
