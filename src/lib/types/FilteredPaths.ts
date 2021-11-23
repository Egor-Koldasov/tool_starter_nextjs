import { Get } from "type-fest";
import { Paths } from "./Paths";
import { UnionToTuple } from "./ToTuple";

export type FilterPathsTuple<Obj extends object, Filter, PathTuple extends any[]> = {
  [K in keyof PathTuple]:
    PathTuple[K] extends string ?
      UnionToTuple<Get<Obj, PathTuple[K]>> extends UnionToTuple<Filter> ?
        PathTuple[K] :
        never :
      never
}[number]

export type FilteredPaths <Obj extends object, Filter> = FilterPathsTuple<Obj, Filter, UnionToTuple<Paths<Obj>>>