import { mergeDeepRight } from "ramda";
import { ReactNode, useState } from "react";
import { rootContext } from "../state/rootContext";
import { initState } from "../state/initState";
import { RootStateUpdate } from "../state/useUpdateModule";

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