import { callApi } from "../../../lib/apiClient";
import { ApiStateSchema, queryInit, useQuery } from "../../../lib/modules/query"
import { useSelectorPath } from "../../state-update";
import { LoginState } from "../login";
import { meSchema } from "./me";

export const loginInit: ApiStateSchema<null> = {
  ...queryInit(),
}

export const loginSchema = meSchema

export const loginQuery =  async (data: LoginState) => {
  const result = await callApi({path: 'login', data, schema: loginSchema, method: 'post'})
  return result.user;
}

export const useLogin = () =>
  useQuery({path: {queryPath: 'api.login.query', dataPath: 'api.me.data'}, query: loginQuery})