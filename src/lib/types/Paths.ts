// https://stackoverflow.com/a/58436959/12148259
// https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object#comment113216525_58436959

import { Get, UnionToIntersection } from "type-fest";

export type Join<K, P> = K extends string | number ?
  P extends string | number ?
  `${K}${"" extends P ? "" : "."}${P}`
  : never : never;

export type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]]

export declare type Paths<T, D extends number = 10> =
  [D] extends [never] ?
    never :
    T extends object ?
      { [K in keyof T]-?: K extends string | number ?
          `${K}` | (Paths<T[K], Prev[D]> extends infer R ? Join<K, R> : never)
          : never
      }[keyof T] :
      ""

export declare type Leaves<T, D extends number = 10> =
  [D] extends [never] ?
    never :
    T extends object ?
      { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T] :
      "";


