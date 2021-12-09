import { Asserts, object, ref, string } from "yup";

export const signupFormSchema = object({
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string().required().oneOf([ref('password')], 'Passwords should match').label('Confirm Password'),
}).required()

export type SignupFormValues = Asserts<typeof signupFormSchema>

export const signupFormInit: SignupFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};