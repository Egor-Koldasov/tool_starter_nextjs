import { loginInit } from "./login";
import { logoutInit } from "./logout";
import { meInit } from "./me";
import { signupInit } from "./signup";

export const resourceInit = {me: meInit, login: loginInit, logout: logoutInit, signup: signupInit}