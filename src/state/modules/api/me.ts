import { GetServerSidePropsContext } from "next";
import { number, object, string } from "yup";
import { callApi } from "../../../lib/apiClient";
import { queryInit, useQuery, ApiStateSchema } from "../../../lib/modules/query";

export type User = {
  email: string,
  id: number,
}
export interface Me extends ApiStateSchema<User> {

}

export const meInit: Me = {
  ...queryInit()
};

export const meSchema = object({
  user: object({
    email: string().required(),
    id: number().integer().required(),
  }).nullable()
}).required()

export const getMe = async (ctx?: GetServerSidePropsContext) => {
  const result = await callApi({path: 'me', ctx, schema: meSchema})
  return result.user;
}
export const useMe = () => useQuery({path: 'api.me', query: getMe});

