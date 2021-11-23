export type UnionToObject<Union extends string> = {[K in Union]: K}
