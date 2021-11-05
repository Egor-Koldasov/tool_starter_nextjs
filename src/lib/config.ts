import { isServerEnvironment } from "./environment";

const graphqlServerHost = process.env.GRAPHQL_HOST || 'graphql';
const graphqlClientHost = process.env.NEXT_PUBLIC_GRAPHQL_HOST || 'localhost';
const isServer = isServerEnvironment();

const logs = {
  graphqlRequests: false,
}
const config = {
  graphqlSsl: process.env.NEXT_PUBLIC_GRAPHQL_SSL === 'FALSE' ? false : true,
  graphqlHost: isServer ? graphqlServerHost : graphqlClientHost,
  graphqlPort: parseInt(String(process.env.NEXT_PUBLIC_GRAPHQL_PORT)) || 4000,
  graphqlPath: process.env.NEXT_PUBLIC_GRAPHQL_PATH || '/graphql',
  logs,
};
export default config;