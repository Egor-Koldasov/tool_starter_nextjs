import axios from "axios";
import { GetServerSidePropsContext } from "next";
import config from "./config";

export const client = axios.create({withCredentials: true});
export const apiClient = (ctx?: GetServerSidePropsContext) => {
  return axios.create({
    withCredentials: true,
    headers: (
      ctx != null ?
        {'Cookie': ctx.req.headers.cookie || ''} :
        {}
    ),
    transformResponse: [(data, headers) => {
      if (headers && headers['Set-Cookie']) {
        ctx?.res.setHeader('Set-Cookie', headers['Set-Cookie']);
      }
      return data;
    }],
  })
}
export const apiUrl = (path: string) => {
  const protocol = config.apiSsl ? 'https': 'http';
  return `${protocol}://${config.apiHost}:${config.apiPort}/${path}`;
}
export const isApiError = axios.isAxiosError;
