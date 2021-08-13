import styled from "styled-components/native";

export const Container = styled.View``;
export const RowWrapper = styled.View`
  width: 100%;
  flex-direction: row;
`;
export const AvatarContainer = styled.View`
  flex: 1;
`;
export const Avatar = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  overflow: hidden;
`;
export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
export const ActivityContainer = styled.View`
  flex: 2.5;
  flex-direction: row;
  margin: 5px;
`;
export const Activity = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
export const NumberText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.color};
`;
export const InfoTitle = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.color};
`;
export const ColumnWrapper = styled.View``;
export const UserName = styled.Text`
  font-weight: bold;
  margin: 5px 0;
  color: ${(props) => props.theme.color};
`;
export const Introduction = styled.Text``;
