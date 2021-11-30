import { Asserts, object, string } from "yup";

export const loginFormSchema = object({
  email: string().email().required(),
  password: string().required(),
}).required()

export type LoginForm = Asserts<typeof loginFormSchema>

export const loginFormInit: LoginForm = {
  email: '',
  password: '',
};
