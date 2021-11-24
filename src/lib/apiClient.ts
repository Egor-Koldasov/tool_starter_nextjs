import axios, { AxiosResponseTransformer } from "axios";
import { GetServerSidePropsContext } from "next";
import { BaseSchema } from "yup";
import config from "./config";

export const apiClient = (ctx?: GetServerSidePropsContext) => {
  return axios.create({
    withCredentials: true,
    responseType: "json",
    transitional: {silentJSONParsing: false},
    headers: (
      ctx != null ?
        {'Cookie': ctx.req.headers.cookie || ''} :
        {}
    ),
    transformResponse: [
      ...axios.defaults.transformResponse as AxiosResponseTransformer[],
      (data, headers) => {
        if (headers && headers['Set-Cookie']) {
          ctx?.res.setHeader('Set-Cookie', headers['Set-Cookie']);
        }
        return data;
      }
    ],
  })
}
export const apiUrl = (path: string) => {
  const protocol = config.apiSsl ? 'https': 'http';
  return `${protocol}://${config.apiHost}:${config.apiPort}/${path}`;
}
export const isApiError = axios.isAxiosError;

export type ApiMethod = 'get' | 'post' | 'put' | 'delete'
export type CallApiOptions<Data extends object, Result> = {
  method?: ApiMethod,
  data?: Data,
  schema?: BaseSchema<any, any, Result>,
  path: string,
  ctx?: GetServerSidePropsContext
}

export const callApi = async <Data extends object, Result>(options: CallApiOptions<Data, Result>) => {
  const method = options.method || 'get';
  const result = await apiClient(options.ctx)[method](apiUrl(options.path), options.data);
  console.log('123', result)
  if (options.schema) {
    const parsedResult = await options.schema.validate(result.data);
    return parsedResult;
  }
}

