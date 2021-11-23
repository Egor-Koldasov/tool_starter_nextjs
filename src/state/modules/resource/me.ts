import { GetServerSidePropsContext } from "next";
import { number, object, string } from "yup";
import { apiClient, apiUrl } from "../../../lib/apiClient";
import { queryInit, ApiState, useQuery, ApiStateSchema } from "../../../lib/modules/query";

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
  const result = await apiClient(ctx).get(apiUrl('me'));
  const data = await meSchema.validate(result.data);
  return data.user;
}
export const useMe = () => useQuery({path: 'resource.me', query: getMe});

