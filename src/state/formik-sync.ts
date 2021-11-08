import { FormikContextType } from "formik";
import { Dispatch, SetStateAction } from "react";
import { Context, createContext } from "use-context-selector";
import loginInit from "./modules/login";

type FormikSyncState = FormikContextType<typeof loginInit>;
type FormikSyncContextValue = [
  state: FormikSyncState,
  setState: Dispatch<SetStateAction<FormikSyncState>>
]
export const formikSyncContext: Context<FormikSyncContextValue> = createContext(null as unknown as (FormikSyncContextValue));
