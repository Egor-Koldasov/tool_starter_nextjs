
export const requireVar = (envVar: string | undefined, name: string): string => {
  if (envVar === undefined) {
    const serverVarOnClient = !name.startsWith('NEXT_PUBLIC_') && typeof window !== undefined;
    if (!serverVarOnClient) throw new Error(`Environment variable "${name}" is not set`);
    return '';
  }
  return envVar;
}
export const stringVar = (envVar: string | undefined, name: string, defaultVal?: string): string => {
  if (defaultVal === undefined) {
    return requireVar(envVar, name);
  }
  return envVar !== undefined ? envVar : defaultVal;
}

const stringVarToNumber = <DefaultVal>(envVar: string, defaultVal: DefaultVal): number | DefaultVal => {
  const falseNumber = parseInt(envVar);
  if (!isFinite(falseNumber)) {
    return defaultVal
  };
  return falseNumber;
}

export const numberVar = (envVar: string | undefined, name: string, defaultVal?: number): number => {
  if (defaultVal === undefined) {
    const number = stringVarToNumber(requireVar(envVar, name), undefined);
    if (number === undefined) throw new Error(`Environment variable ${name} is not a valid number`);
    return number;
  }
  const env = process.env[name];
  return env ? stringVarToNumber(env, defaultVal) : defaultVal;
}

export const booleanVar = (envVar: string | undefined, name: string, defaultVal?: boolean): boolean => {
  if (defaultVal === undefined) {
    const stringVar = requireVar(envVar, name);
    if (stringVar !== 'FALSE' && stringVar !== 'TRUE') {
      throw new Error(`Environment variable ${name} should be either TRUE or FALSE`);
    }
    return stringVar === 'TRUE';
  }
  const env = process.env[name];
  return defaultVal === true ? env === 'FALSE' : defaultVal === false;
}
