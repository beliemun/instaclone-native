import React, { useEffect } from "react";
import * as CS from "./styles";
import Shared from "@Components";
import {
  ProfileScreenNavigationProp,
  ProfileScreenRouteProp,
} from "types/navigation/auth";
import useUser from "~/hooks/useUser";
import { useQuery } from "@apollo/client";
import { SEE_PROFILE_QUERY } from "~/common/queries";
import { seeProfile } from "types/__generated__/seeProfile";

interface IProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

const Profile: React.FC<IProps> = ({ navigation, route }) => {
  const { name } = route;
  const userName =
    name === "Profile" ? route.params.userName : useUser().data?.me?.userName;
  const { data, loading } = useQuery<seeProfile>(SEE_PROFILE_QUERY, {
    variables: { userName },
  });

  useEffect(() => {
    navigation.setOptions({ title: `${userName}'s Profile` });
  }, []);

  return (
    <Shared.LoadingLayout loading={loading}>
      <>
        {data?.seeProfile && data?.seePhotos ? (
          <Shared.Gallery
            navigation={navigation}
            data={data.seePhotos}
            headerComponent={() =>
              data.seeProfile ? (
                <CS.Container>
                  <Shared.ProfileHeader user={data.seeProfile} />
                  <Shared.ProfileActions user={data.seeProfile} />
                </CS.Container>
              ) : null
            }
          />
        ) : null}
      </>
    </Shared.LoadingLayout>
  );
};

export default Profile;
