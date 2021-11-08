import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';


// https://webpack.js.org/guides/dependency-management/#requirecontext
export function requireAll(r: any) {
  if (!r.keys) throw new Error("Unexpected require value");
  const keys: string[] = r.keys();
  const pairs = keys.map((key, index, keys): [string, StringKeyObject] => {
    const res = r(key, index, keys);
    const state: unknown = res.default;
    if (typeof state !== 'object' || !state) throw "No default object export"
    const nameMatch = key.match(/\/(.+)\.ts/);
    if (!nameMatch) throw "Cannot parse module name";
    const name = nameMatch[1];
    return [name, state]
  })
  const stateMap = pairs.reduce(
    (stateMapI, pair) => {
      const path = pair[0].split('/');
      return set(lensPath<StringKeyObject>(path), pair[1], stateMapI);
    },
    {}
  );
  return stateMap;
}

// const modulesState = requireAll(require.context('./modules/', true, /\.ts$/));