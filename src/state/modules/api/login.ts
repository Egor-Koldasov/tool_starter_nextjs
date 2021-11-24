import { GetServerSidePropsContext } from "next";
import { apiClient, apiUrl } from "../../../lib/apiClient";
import { ApiStateSchema, queryInit, useQuery } from "../../../lib/modules/query"
import { meSchema } from "./me";

export const loginInit: ApiStateSchema<null> = {
  ...queryInit(),
}

export const loginSchema = meSchema

export const loginQuery = async (ctx?: GetServerSidePropsContext) => {
  const result = await apiClient(ctx).post(apiUrl('post'));
  const data = await meSchema.validate(result.data);
  return data.user;
}

export const useLogin = () => useQuery({path: {queryPath: 'api.login.query', dataPath: 'api.me.data'}, query: loginQuery})