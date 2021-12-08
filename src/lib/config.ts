import { isServerEnvironment } from "./environment";
import { booleanVar, numberVar, stringVar } from "./envVar";

const apiServerHost = stringVar('API_HOST');
const apilClientHost = stringVar('NEXT_PUBLIC_API_HOST');
const isServer = isServerEnvironment();

const config = {
  apiSsl: booleanVar('NEXT_PUBLIC_API_SSL', true),
  apiHost: isServer ? apiServerHost : apilClientHost,
  apiPort: numberVar('NEXT_PUBLIC_API_PORT', 443),
  logLvl: stringVar('NEXT_PUBLIC_LOG_LVL', 'ERROR'),
};
export default config;