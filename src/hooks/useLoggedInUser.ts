import { useEffect } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { me } from "types/__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      userName
      avatar
    }
  }
`;

const useLoggedInUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
};

export default useLoggedInUser;
