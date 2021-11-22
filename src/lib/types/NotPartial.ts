import { Opaque, SetOptional } from "type-fest";

// Marks the object to not be partial when running throw PartialDeep
export type NotPartialTag = Opaque<{}, 'not-partial'>;
export type NotPartial<Type extends {}> = Type & NotPartialTag;
export type ExtractNotPartial<Type> =
  Type extends NotPartialTag ? SetOptional<Type, keyof NotPartialTag> :
    Type extends object ? {[KeyType in keyof Type]: ExtractNotPartial<Type[KeyType]>} :
    Type


