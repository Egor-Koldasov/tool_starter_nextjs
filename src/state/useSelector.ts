import { Get } from "type-fest";
import { useContextSelector } from "use-context-selector";
import get from "../lib/data/get";
import { Paths } from "../lib/types/Paths";
import { rootContext, RootContextValue, RootState } from "./rootContext";

const contextNullError = () => new Error('Cannot use context with null value');
export const useSelector = <Selection>(selector: ((state: RootContextValue) => Selection)) => {
  const nullableSelector = (state: RootContextValue | null) => {
    if (!state)
      throw contextNullError();
    return selector(state);
  };
  return useContextSelector(rootContext, nullableSelector);
};

export const useSelectorPath = <Path extends Paths<RootState>>(path: Path): Get<RootState, Path> => {
  return useSelector(([state]) => get(state, path));
};
