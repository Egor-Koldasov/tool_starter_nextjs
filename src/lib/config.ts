import { isServerEnvironment } from "./environment";

const apiServerHost = process.env.API_HOST || 'api';
const apilClientHost = process.env.NEXT_PUBLIC_API_HOST || 'localhost';
const isServer = isServerEnvironment();
const envToString = (env: string | undefined) => env ? env : ''

const config = {
  apiSsl: process.env.NEXT_PUBLIC_API_SSL === 'FALSE' ? false : true,
  apiHost: isServer ? apiServerHost : apilClientHost,
  apiPort: parseInt(String(process.env.NEXT_PUBLIC_API_PORT)) || 4000,
  logLvl: envToString(process.env.NEXT_PUBLIC_LOG_LVL) || 'DEBUG',
};
export default config;