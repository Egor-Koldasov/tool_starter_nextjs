import config from "./config";

export enum LogLvl {
  SILENT = 1,
  CRITICAL,
  ERROR,
  WARNING,
  INFO,
  DEBUG,
  V,
  VV,
  VVV
}
export const log = (args: any[], lvl: LogLvl) => {
  const logLvlName = config.logLvl as (keyof typeof LogLvl)
  const enabledLvl = LogLvl[logLvlName] || LogLvl.INFO;
  if (lvl > enabledLvl) return;
  console.log(...args);
}
export const debug = (...args: any[]) => log(['debug', ...args], LogLvl.DEBUG);
export const info = (...args: any[]) => log(['info', ...args], LogLvl.INFO);
export const error = (...args: any[]) => log(['error', ...args], LogLvl.ERROR);
export const logError = error;
