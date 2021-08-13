import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ProfileScreenNavigationProp } from "types/navigation/auth";
import { seeProfile_seeProfile } from "types/__generated__/seeProfile";
import * as CS from "./styles";

interface IProps {
  user: seeProfile_seeProfile | null;
}

const ProfileHeader: React.FC<IProps> = ({ user }) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  return user ? (
    <CS.Container>
      <CS.RowWrapper>
        <CS.AvatarContainer>
          <CS.Avatar>
            <CS.Image
              source={{ uri: user.avatar ?? "#" }}
              resizeMode="contain"
            />
          </CS.Avatar>
        </CS.AvatarContainer>
        <CS.ActivityContainer>
          <CS.Activity>
            <CS.NumberText>{user.totalPhotos}</CS.NumberText>
            <CS.InfoTitle>Posts</CS.InfoTitle>
          </CS.Activity>
          <CS.Activity
            onPress={() =>
              navigation.navigate("Followers", { userName: user.userName })
            }
          >
            <CS.NumberText>{user.totalFollowers}</CS.NumberText>
            <CS.InfoTitle>Followers</CS.InfoTitle>
          </CS.Activity>
          <CS.Activity
            onPress={() =>
              navigation.navigate("Following", { userName: user.userName })
            }
          >
            <CS.NumberText>{user.totalFollowing}</CS.NumberText>
            <CS.InfoTitle>Following</CS.InfoTitle>
          </CS.Activity>
        </CS.ActivityContainer>
      </CS.RowWrapper>
      <CS.ColumnWrapper>
        <CS.UserName>{user.userName}</CS.UserName>
        <CS.Introduction>{user.bio}</CS.Introduction>
      </CS.ColumnWrapper>
    </CS.Container>
  ) : null;
};

export default ProfileHeader;
