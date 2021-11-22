import { GetServerSidePropsContext } from "next";
import { Simplify } from "type-fest";
import { Asserts, number, object, string } from "yup";
import { apiClient, apiUrl } from "../../../lib/apiClient";
import { queryInit, QueryState, useQuery } from "../../../lib/modules/query";

export type User = {
  email: string,
  id: number,
}
export interface Me extends QueryState<User> {

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

export const getMe = async (ctx?: GetServerSidePropsContext): Promise<Simplify<Asserts<typeof meSchema>>> => {
  const result = await apiClient(ctx).get(apiUrl('me'));
  console.log('result.data', result.data)
  const data = await meSchema.validate(result.data);
  return data;
}
export const useMe = () => {
  const query = useQuery({queryPath: 'me.query', dataPath: 'me.data'});
  return async () => {
    try {
      query.updateQuery({loading: true});
      const data = await getMe();
      query.updateQuery({loading: false, loaded: true});
      query.updateData(data.user);
    } catch (error) {
      query.updateQuery({error: error, loading: false});
    }
  }
}

