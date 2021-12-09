import { useRouter } from "next/router";
import { callApi } from "../../../lib/apiClient";
import { ApiStateSchema, queryInit, useQuery } from "../../../lib/modules/query"
import { SignupFormValues } from "../../form/signup";
import { meSchema } from "./me";

export const signupInit: ApiStateSchema<null> = {
  ...queryInit(),
}

export const signupSchema = meSchema

export const signupQuery =  async (data: SignupFormValues) => {
  const result = await callApi({path: 'signup', data, schema: signupSchema, method: 'post'})
  return result.user;
}

export const useSignup = () => {
  const signup = useQuery({path: {queryPath: 'api.signup.query', dataPath: 'api.me.data'}, query: signupQuery});
  const router = useRouter();
  return async (values: SignupFormValues) => {
    const res = await signup(values);
    if (res.success) await router.push('/profile');
    return res;
  }
}