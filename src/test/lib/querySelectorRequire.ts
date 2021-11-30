import { assertThruly } from "./assertThruly";

export const querySelectorRequire = <T extends Element>(selection: string) => {
  const el = document.querySelector<T>(selection);
  assertThruly(el);
  return el;
}