import { isServerEnvironment } from "./environment";

const apiServerHost = process.env.API_HOST;
const apilClientHost = process.env.NEXT_PUBLIC_API_HOST;
const isServer = isServerEnvironment();
const envToString = (env: string | undefined) => env ? env : ''

const config = {
  apiSsl: process.env.NEXT_PUBLIC_API_SSL === 'FALSE' ? false : true,
  apiHost: isServer ? apiServerHost : apilClientHost,
  apiPort: parseInt(String(process.env.NEXT_PUBLIC_API_PORT)) || 443,
  logLvl: envToString(process.env.NEXT_PUBLIC_LOG_LVL) || 'ERROR',
};
export default config;