import { PartialDeep } from "type-fest";
import { useContextSelector } from "use-context-selector";
import { rootContext } from "../state-root";

export interface LoginState {
  email: string,
  password: string,
}

export const loginState: LoginState = {
  email: '',
  password: '',
}

// export const useLogin = makeStateModule('login');
export const useUpdateLogin = () =>  {
  const setState = useContextSelector(rootContext, (value) => {
    if (!value) throw "Error null value";
    return value[1];
  })
  const updateLogin = (update: PartialDeep<LoginState>) => {
    return setState((state) => {
      const nextState = {
        ...state,
        login: {
          ...state.login,
          ...update,
        }
      }
      return nextState;
    })
  }
  return updateLogin;
}

export default loginState;
