// https://stackoverflow.com/a/50375286
// https://stackoverflow.com/a/52933137/12148259

import { UnionToIntersection } from "type-fest";

type UnionToFunctions<U> =
    U extends unknown ? (k: U) => void : never;

type IntersectionOfFunctionsToType<F> =
    F extends { (a: infer A): void; (b: infer B): void; (c: infer C): void; } ? [A, B, C] :
    F extends { (a: infer A): void; (b: infer B): void; } ? [A, B] :
    F extends { (a: infer A): void } ? [A] :
    never;

// https://stackoverflow.com/a/53955431/12148259
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

// useful if you want to check the all types in a union
export type SplitUnion<T> =
    IsUnion<T> extends true ?
        IntersectionOfFunctionsToType<UnionToIntersection<UnionToFunctions<T>>> :
        T;