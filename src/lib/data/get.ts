import { Get } from 'type-fest';
import path from 'ramda/src/path';
import { Paths } from '../types/Paths';

// if I change Path from string to Paths<BaseType> typescript server will start to work very slow
const get = <BaseType, Path extends string>(object: BaseType, pathname: Path): Get<BaseType, Path> =>
  path(pathname.split('.'), object)!;
export default get;
