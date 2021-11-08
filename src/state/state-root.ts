import { Dispatch, SetStateAction } from "react";
import { Context, createContext } from 'use-context-selector';
import loginState from "./modules/login";

export const initState = {
  login: loginState,
};

export type RootState = typeof initState;
export type RootContextValue = [
  state: RootState,
  setState: Dispatch<SetStateAction<RootState>>
]
export type RootContext = Context<RootContextValue | null>

export const rootContext: RootContext = createContext<RootContextValue | null>(null);
