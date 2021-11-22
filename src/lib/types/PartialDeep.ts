import { Primitive } from "type-fest";
import { PartialMapDeep, PartialReadonlyMapDeep, PartialReadonlySetDeep, PartialSetDeep } from "type-fest/source/partial-deep";
import { ExtractNotPartial, NotPartialTag } from "./NotPartial";

type PartialObjectDeep<ObjectType extends object> = {
	[KeyType in keyof ObjectType]?: PartialDeep<ObjectType[KeyType]>
};

// this is updated type, props that have union types like (Object | null) need to be included complitely
export type PartialDeepSaveTag<T> =
  T extends (NotPartialTag)
  ? T
  : T extends Primitive
	? Partial<T>
	: T extends Map<infer KeyType, infer ValueType>
	? PartialMapDeep<KeyType, ValueType>
	: T extends Set<infer ItemType>
	? PartialSetDeep<ItemType>
	: T extends ReadonlyMap<infer KeyType, infer ValueType>
	? PartialReadonlyMapDeep<KeyType, ValueType>
	: T extends ReadonlySet<infer ItemType>
	? PartialReadonlySetDeep<ItemType>
	: T extends ((...args: any[]) => unknown)
	? T | undefined
	: T extends object
	? T extends Array<infer ItemType> // Test for arrays/tuples, per https://github.com/microsoft/TypeScript/issues/35156
		? ItemType[] extends T // Test for arrays (non-tuples) specifically
			? Array<PartialDeepSaveTag<ItemType | undefined>> // Recreate relevant array type to prevent eager evaluation of circular reference
			: PartialObjectDeep<T> // Tuples behave properly
		: PartialObjectDeep<T>
	: unknown;

export type PartialDeep<T> = ExtractNotPartial<PartialDeepSaveTag<T>>
