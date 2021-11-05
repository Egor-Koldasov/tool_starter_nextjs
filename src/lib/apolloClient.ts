import { ApolloClient, InMemoryCache, gql, NormalizedCacheObject, HttpLink } from "@apollo/client";
import config from "./config";

const getGraphqlUrl = () => {
  const protocol = config.graphqlSsl ? 'https://' : 'http://';
  return `${protocol}${config.graphqlHost}:${config.graphqlPort}${config.graphqlPath}`;
}

const testClient = async (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const meResult = await apolloClient
    .query({
      query: gql`
        query Query {
          me {
            email
          }
        }
      `
    })
  console.log('meResult', meResult);
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
const customFetch = async (input: RequestInfo, init?: RequestInit | undefined): Promise<Response> => {
  if (config.logs.graphqlRequests) console.log('Send request', input);
  const fetchRes = await fetch(input, init);
  if (config.logs.graphqlRequests) console.log('Send received', input);
  return fetchRes;
}
const makeApolloClient = () => {
  const link = new HttpLink({
    uri: getGraphqlUrl(),
    fetch: customFetch,
  });
  const apolloClient = new ApolloClient({
    ssrMode: true,
    link,
    cache: new InMemoryCache()
  });
  // testClient(apolloClient)
  return apolloClient;
}

export const getApolloClient = () => {
  if (!apolloClient) {
    apolloClient = makeApolloClient();
  }
  return apolloClient;
}
