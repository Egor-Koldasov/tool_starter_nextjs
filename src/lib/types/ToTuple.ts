import { UnionToIntersection } from "type-fest";

// https://stackoverflow.com/a/53955431/12148259
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

// https://stackoverflow.com/a/70061272/12148259
type UnionToParm<U> = U extends any ? (k: U) => void : never;
type UnionToSect<U> = UnionToParm<U> extends ((k: infer I) => void) ? I : never;
type ExtractParm<F> = F extends { (a: infer A): void } ? A : never;

type SpliceOne<Union> = Exclude<Union, ExtractOne<Union>>;
type ExtractOne<Union> = ExtractParm<UnionToSect<UnionToParm<Union>>>;

export type UnionToTuple<Union> = ToTupleRec<Union, []>;

type ToTupleRec<Union, Rslt extends any[]> = 
    SpliceOne<Union> extends never ? [ExtractOne<Union>, ...Rslt]
    : ToTupleRec<SpliceOne<Union>, [ExtractOne<Union>, ...Rslt]>
;
