import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { number, object, string } from "yup";
import { callApi } from "../../../lib/apiClient";
import { queryInit, ApiStateSchema, makeStateQueries } from "../../../lib/modules/query";
import { PageProps } from "../../../pages/_app";

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

export const {useQuery: useMe, ssrQuery: ssrMe} = makeStateQueries({path: 'api.me', query: getMe});

export const ssrRequireLogin: GetServerSideProps<PageProps> = async (ctx: GetServerSidePropsContext) => {
  const res = await ssrMe(ctx);
  if (!res.props.initState.api?.me?.data) {
    return {redirect: {destination: '/login', permanent: true}};
  }
  return res;
}

