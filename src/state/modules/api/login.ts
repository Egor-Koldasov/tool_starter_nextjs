import { useRouter } from "next/router";
import { callApi } from "../../../lib/apiClient";
import { ApiStateSchema, queryInit, useQuery } from "../../../lib/modules/query"
import { LoginForm } from "../../form/login";
import { meSchema } from "./me";

export const loginInit: ApiStateSchema<null> = {
  ...queryInit(),
}

export const loginSchema = meSchema

export const loginQuery =  async (data: LoginForm) => {
  const result = await callApi({path: 'login', data, schema: loginSchema, method: 'post'})
  return result.user;
}

export const useLogin = () => {
  const login = useQuery({path: {queryPath: 'api.login.query', dataPath: 'api.me.data'}, query: loginQuery});
  const router = useRouter();
  return async (values: LoginForm) => {
    const res = await login(values);
    if (res.success) await router.push('/profile');
    return res;
  }
}