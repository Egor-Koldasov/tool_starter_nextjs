import lensPath from "ramda/src/lensPath";
import mergeDeepRight from "ramda/src/mergeDeepRight";
import set from "ramda/src/set";
import { Get, PartialDeep } from "type-fest";
import { useContext, useContextSelector } from "use-context-selector";
import get from "../lib/data/get";
import { rootContext, RootContextValue, RootState, SetRootState } from "./state-root";

const contextNullError = () => new Error('Cannot use context with null value');
export const useSelector = <Selection>(selector: ((state: RootContextValue) => Selection)) => {
  const nullableSelector = (state: RootContextValue | null) => {
    if (!state) throw contextNullError();
    return selector(state);
  }
  return useContextSelector(rootContext, nullableSelector);
}

function mergeRootState(setState: SetRootState, update: PartialDeep<RootState>): void {
  return setState((state) => mergeDeepRight(state, update));
}
function replaceRootState(setState: SetRootState, update: RootState): void {
  return setState(() => update);
}

export type UpdateStateStrategy = 'merge' | 'replace';
export const useUpdateRootState = () => {
  const setState = useSelector(([,setState]) => setState);
  function update(update: RootState, strategy: 'replace'): void;
  function update(update: PartialDeep<RootState>, strategy?: 'merge'): void;
  function update(
    update: RootState | PartialDeep<RootState>,
    strategy: UpdateStateStrategy = 'merge'
  ) {
    if (strategy === 'replace') return replaceRootState(setState, update as RootState);
    return mergeRootState(setState, update);
  }
  return update;
}

export const useUpdateModule = <Path extends Paths<RootState>, ModuleState extends Get<RootState, Path>>(path: Path) => {
  const updateState = useUpdateRootState();
  const updateModule = (update: PartialDeep<ModuleState>) => {
    const rootUpdate: PartialDeep<RootState> = set(lensPath(path.split('.')), update, {});
    return updateState(rootUpdate);
  }
  return updateModule;
}
