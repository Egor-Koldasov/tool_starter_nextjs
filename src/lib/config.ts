import { isServerEnvironment } from "./environment";
import { booleanVar, numberVar, stringVar } from "./envVar";

// NEXT_PUBLIC_ environment vars need to be accesed directly as process.env.NEXT_PUBLIC_...
// otherwise they will not be replaced with values during the build time

const apiServerHost = stringVar(process.env.API_HOST, 'API_HOST');
const apilClientHost = stringVar(process.env.NEXT_PUBLIC_API_HOST, 'NEXT_PUBLIC_API_HOST');
const isServer = isServerEnvironment();

const config = {
  apiSsl: booleanVar(process.env.NEXT_PUBLIC_API_SSL, 'NEXT_PUBLIC_API_SSL', true),
  apiHost: isServer ? apiServerHost : apilClientHost,
  apilClientHost,
  apiPort: numberVar(process.env.NEXT_PUBLIC_API_PORT, 'NEXT_PUBLIC_API_PORT', 443),
  logLvl: stringVar(process.env.NEXT_PUBLIC_LOG_LVL, 'NEXT_PUBLIC_LOG_LVL', 'ERROR'),
};
export default config;