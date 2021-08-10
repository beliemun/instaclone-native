import { useEffect } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { me } from "types/__generated__/me";
import { ME_QUERY } from "~/common/queries";

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
    return () => {
      data;
    };
  }, [data]);
  return { data };
};

export default useUser;
