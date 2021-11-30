export function assertThruly<T>(el: T): asserts el is NonNullable<T> {
  expect(el).toBeTruthy();
}