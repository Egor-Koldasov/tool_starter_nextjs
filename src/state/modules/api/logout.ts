import router from "next/router";
import { callApi } from "../../../lib/apiClient";
import { ApiStateSchema, queryInit, useQuery } from "../../../lib/modules/query";

export const logoutInit: ApiStateSchema<null> = {
  ...queryInit(),
}

const logoutQuery = async () => {
  await callApi({path: 'logout', method: 'post'})
  return null;
}

export const useLogout = () => {
  const logout = useQuery({path: {queryPath: 'api.logout.query', dataPath: 'api.me.data'}, query: logoutQuery});
  return async () => {
    await router.push('/');
    await logout();
  }
}
