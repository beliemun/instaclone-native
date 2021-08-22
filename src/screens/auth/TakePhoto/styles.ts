import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: black;
`;

export const Grid = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid white;
`;

export const Top = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 200px;
`;

export const Bottom = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 200px;
`;

export const SliderContianer = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

export const Buttons = styled.View<{ justifyContent: string }>`
  width: 100%;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent};
`;

export const Sutter = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
`;

export const SutterInside = styled.View`
  width: 54px;
  height: 54px;
  border-radius: 27px;
  background-color: white;
  border: 2px solid black;
`;

export const Button = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: #ffffff20;
`;

export const PhotoInAlbum = styled.Image`
  width: 100%;
  height: 100%;
`;

export const TakenPhoto = styled.Image<{ width: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
`;
