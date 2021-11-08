import { ConsistsOnlyOf, ToPath, WithStringKeys } from "type-fest/source/get";
import { StringDigit } from "type-fest/source/utilities";

type PropertyOf<BaseType, Key extends string> =
	BaseType extends null | undefined
	? undefined
	: Key extends keyof BaseType
	? BaseType[Key]
	: BaseType extends [] | [unknown, ...unknown[]]
	? unknown // It's a tuple, but `Key` did not extend `keyof BaseType`. So the index is out of bounds.
	: BaseType extends {
		[n: number]: infer Item;
		length: number; // Note: This is needed to avoid being too lax with records types using number keys like `{0: string; 1: boolean}`.
	}
	? (
		ConsistsOnlyOf<Key, StringDigit> extends true
		? Item
		: undefined
	)
	: Key extends keyof WithStringKeys<BaseType>
	? WithStringKeys<BaseType>[Key]
	: undefined;

type GetWithPath<BaseType, Keys extends readonly string[]> =
	Keys extends []
	? BaseType
	: Keys extends [infer Head, ...infer Tail]
	? GetWithPath<PropertyOf<BaseType, Extract<Head, string>>, Extract<Tail, string[]>>
	: undefined;

type Get<BaseType, Path extends string> = GetWithPath<BaseType, ToPath<Path>>;