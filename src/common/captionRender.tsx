import React from "react";
import { Text } from "react-native";
import Shared from "@Components";

const captionRender = (text: string) => {
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

export default captionRender;
