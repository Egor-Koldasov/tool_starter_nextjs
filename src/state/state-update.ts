import lensPath from "ramda/src/lensPath";
import mergeDeepRight from "ramda/src/mergeDeepRight";
import set from "ramda/src/set";
import { Get } from "type-fest";
import { useContextSelector } from "use-context-selector";
import get from "../lib/data/get";
import { PartialDeep } from "../lib/types/PartialDeep";
import { Paths } from "../lib/types/Paths";
import { rootContext, RootContextValue, RootState, RootStateSchema, SetRootState } from "./state-root";

export type StateUpdate<ModuleState> = PartialDeep<ModuleState>;
export type RootStateUpdate = StateUpdate<RootStateSchema>;

const contextNullError = () => new Error('Cannot use context with null value');
export const useSelector = <Selection>(selector: ((state: RootContextValue) => Selection)) => {
  const nullableSelector = (state: RootContextValue | null) => {
    if (!state) throw contextNullError();
    return selector(state);
  }
  return useContextSelector(rootContext, nullableSelector);
}

export const useSelectorPath = <Path extends Paths<RootState>>(path: Path): Get<RootState, Path> => {
  return useSelector(([state]) => get(state, path));
}

export function mergeRootState(setState: SetRootState, update: RootStateUpdate): void {
  return setState((state) => mergeDeepRight(state, update));
}
function replaceRootState(setState: SetRootState, update: RootState): void {
  return setState(() => update);
}

export type UpdateStateStrategy = 'merge' | 'replace';
export const useUpdateRootState = () => {
  const setState = useSelector(([,setState]) => setState);
  function update(update: RootState, strategy: 'replace'): void;
  function update(update: RootStateUpdate, strategy?: 'merge'): void;
  function update(
    update: RootState | RootStateUpdate,
    strategy: UpdateStateStrategy = 'merge'
  ) {
    if (strategy === 'replace') return replaceRootState(setState, update as RootState);
    return mergeRootState(setState, update);
  }
  return update;
}

export const useUpdateModule = <Path extends Paths<RootState>, ModuleState extends Get<RootState, Path>>(path: Path) => {
  const updateState = useUpdateRootState();
  const updateModule = (update: StateUpdate<ModuleState>) => {
    const rootUpdate: RootStateUpdate = set(lensPath(path.split('.')), update as PartialDeep<ModuleState>, {});
    return updateState(rootUpdate);
  }
  return updateModule;
}
