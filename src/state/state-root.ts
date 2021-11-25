import { Dispatch, SetStateAction } from "react";
import { Context, createContext } from 'use-context-selector';
import { ExtractNotPartial } from "../lib/types/NotPartial";
import {loginInit} from "./modules/login";
import { navInit } from "./modules/nav";
import { resourceInit } from "./modules/api";

export const initState = {
  login: loginInit,
  nav: navInit,
  api: resourceInit,
};

export type RootStateSchema = typeof initState;
export type RootState = ExtractNotPartial<RootStateSchema>;
export type SetRootState = Dispatch<SetStateAction<RootState>>
export type RootContextValue = [
  state: RootState,
  setState: SetRootState
]
export type RootContext = Context<RootContextValue | null>

export const rootContext: RootContext = createContext<RootContextValue | null>(null);