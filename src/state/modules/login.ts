import { useUpdateModule } from "../state-update";

export interface LoginState {
  email: string,
  password: string,
}

export const loginInit: LoginState = {
  email: '',
  password: '',
}

export const useUpdateLogin = () => useUpdateModule('login');

export default loginInit;
