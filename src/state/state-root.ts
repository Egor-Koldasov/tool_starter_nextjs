import { Dispatch, SetStateAction } from "react";
import { Context, createContext } from 'use-context-selector';
import loginInit from "./modules/login";
import { navInit } from "./modules/nav";

export const initState = {
  login: loginInit,
  nav: navInit,
};

export type RootState = typeof initState;
export type SetRootState = Dispatch<SetStateAction<RootState>>
export type RootContextValue = [
  state: RootState,
  setState: SetRootState
]
export type RootContext = Context<RootContextValue | null>

export const rootContext: RootContext = createContext<RootContextValue | null>(null);
