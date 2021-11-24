import { loginInit } from "./login";
import { logoutInit } from "./logout";
import { meInit } from "./me";

export const resourceInit = {me: meInit, login: loginInit, logout: logoutInit}