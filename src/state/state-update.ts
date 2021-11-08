import lensPath from "ramda/src/lensPath";
import mergeDeepRight from "ramda/src/mergeDeepRight";
import set from "ramda/src/set";
import { Get, PartialDeep } from "type-fest";
import { useContext, useContextSelector } from "use-context-selector";
import get from "../lib/data/get";
import { rootContext, RootContextValue, RootState } from "./state-root";

const contextNullError = () => new Error('Cannot use context with null value');
export const useSelector = <Selection>(selector: ((state: RootContextValue) => Selection)) => {
  const nullableSelector = (state: RootContextValue | null) => {
    if (!state) throw contextNullError();
    return selector(state);
  }
  return useContextSelector(rootContext, nullableSelector);
}

type UpdateStateStrategy = 'merge' | 'replace';
export function updateRootState(contextValue: RootContextValue, update: RootState, strategy: 'replace'): void;
export function updateRootState(contextValue: RootContextValue, update: PartialDeep<RootState>, strategy?: 'merge'): void;
export function updateRootState(
  contextValue: RootContextValue,
  update: RootState | PartialDeep<RootState>,
  strategy: UpdateStateStrategy = 'merge')
  {
    if (strategy === 'replace') return replaceRootState(contextValue, update as RootState);
    return mergeRootState(contextValue, update);
  }
function mergeRootState(contextValue: RootContextValue, update: PartialDeep<RootState>): void {
  const [state, setState] = contextValue;
  return setState(mergeDeepRight(state, update));
}
function replaceRootState(contextValue: RootContextValue, update: RootState): void {
  const [, setState] = contextValue;
  return setState(update);
}

type RootPaths = Paths<RootState>;
export const makeStateModule = <LocalPath extends RootPaths>(modulePath: LocalPath) => {
  const useLocalState = () => {
    type ModuleState = Get<RootState, LocalPath>
    const localState = useSelector<ModuleState>(([state]) => {
      const pathRes = get(state, modulePath);
      return pathRes;
    });
    const contextValue = useContext(rootContext);
    if (!contextValue) throw contextNullError();
    const updateLocalState =
      (localUpdate: PartialDeep<ModuleState>) =>
        updateRootState(contextValue, set(lensPath(modulePath.split('.')), localUpdate, {}));
    return {localState, updateLocalState}
  }
  return useLocalState;
}
