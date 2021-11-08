declare module '*.css';
declare module '*.scss';
declare type StringKeyObject = object & (keyof StringKeyObject extends string ? {} : "T must only have string keys")
type Join<K, P> = K extends string | number ?
    P extends string | number ?
    `${K}${"" extends P ? "" : "."}${P}`
    : never : never;
declare type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
    { [K in keyof T]-?: K extends string | number ?
        `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never
    }[keyof T] : ""
declare type Leaves<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
{ [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T] : "";