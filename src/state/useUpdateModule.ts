import lensPath from "ramda/src/lensPath";
import mergeDeepRight from "ramda/src/mergeDeepRight";
import set from "ramda/src/set";
import { Get } from "type-fest";
import { PartialDeep } from "../lib/types/PartialDeep";
import { Paths } from "../lib/types/Paths";
import { useSelector } from "./useSelector";
import { RootState, RootStateSchema, SetRootState } from "./rootContext";

export type StateUpdate<ModuleState> = PartialDeep<ModuleState>;
export type RootStateUpdate = StateUpdate<RootStateSchema>;

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
