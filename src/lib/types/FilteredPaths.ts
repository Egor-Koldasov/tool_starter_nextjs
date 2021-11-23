import { Get } from "type-fest";
import { Paths } from "./Paths";
import { SplitUnion } from "./SplitUnion";
import { UnionToObject } from "./UnionToObject";

export type FilteredPaths <Obj extends object, Filter> = {
  [K in keyof UnionToObject<Paths<Obj>>]: K extends string ? SplitUnion<Get<Obj, K> > extends SplitUnion<Filter> ? K : never : never
}[keyof UnionToObject<Paths<Obj>>]
