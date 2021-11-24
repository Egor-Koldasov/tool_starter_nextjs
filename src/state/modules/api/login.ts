import { GetServerSidePropsContext } from "next";
import { apiClient, apiUrl } from "../../../lib/apiClient";
import { ApiStateSchema, queryInit, useQuery } from "../../../lib/modules/query"
import { LoginState } from "../login";
import { meSchema } from "./me";

export const loginInit: ApiStateSchema<null> = {
  ...queryInit(),
}

export const loginSchema = meSchema

export const loginQuery = async (data: LoginState) => {
  const result = await apiClient().post(apiUrl('login'), data);
  const parsedResult = await meSchema.validate(result.data);
  return parsedResult.user;
}

export const useLogin = () => useQuery({path: {queryPath: 'api.login.query', dataPath: 'api.me.data'}, query: loginQuery})