import { PropsWithChildren } from "react";
import { signupFormInit, signupFormSchema } from "../../state/form/signup";
import { useSignup } from "../../state/modules/api/signup";
import Form from "../form/Form";
import { LoginFormStyled } from "../login/LoginForm";

export default function SignupForm(props: PropsWithChildren<{}>) {
  const signup = useSignup();
  return (
    <Form
      initialValues={signupFormInit}
      onSubmit={signup}
      validationSchema={signupFormSchema}
      FormEl={LoginFormStyled}
    >
      {props.children}
    </Form>
  )
}