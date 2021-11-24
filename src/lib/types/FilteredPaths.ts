import { Get } from "type-fest";
import { Paths } from "./Paths";
import { DeepUnionToTuple, UnionToTuple } from "./UnionToTuple";

export type FilterPathsTuple<Obj extends object, Filter, PathTuple extends any[]> = {
  [K in keyof PathTuple]:
    PathTuple[K] extends string ?
      DeepUnionToTuple<Get<Obj, PathTuple[K]>> extends DeepUnionToTuple<Filter> ?
        PathTuple[K] :
        never :
      never
}[number]

export type FilteredPaths <Obj extends object, Filter> = FilterPathsTuple<Obj, Filter, UnionToTuple<Paths<Obj>>>