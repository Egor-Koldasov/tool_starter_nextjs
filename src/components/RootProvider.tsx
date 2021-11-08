import { useState } from "react";
import { initState, rootContext } from "../state/state-root";

const RootProvider = ({ children }: any) => {
  const [state, setState] = useState(initState);
  return (
    <rootContext.Provider value={[state, setState]}>
      {children}
    </rootContext.Provider>
  );
};

export default RootProvider