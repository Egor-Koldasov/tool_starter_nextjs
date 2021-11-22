import { mergeDeepRight } from "ramda";
import { ReactNode, useState } from "react";
import { initState, rootContext } from "../state/state-root";
import { RootStateUpdate } from "../state/state-update";

export type RootProviderProps = {
  initState?: RootStateUpdate
  children?: ReactNode
}

const RootProvider = (props: RootProviderProps) => {
  const initStateLoaded = props.initState ? mergeDeepRight(initState, props.initState) : initState;
  const [state, setState] = useState(initStateLoaded);
  return (
    <rootContext.Provider value={[state, setState]}>
      {props.children}
    </rootContext.Provider>
  );
};

export default RootProvider