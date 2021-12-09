import { PropsWithChildren } from "react";
import styled from "styled-components";
import { ScreenBP } from "../../lib/styles/ScreenBP";
import { loginFormInit, loginFormSchema } from "../../state/form/login";
import { useLogin } from "../../state/modules/api/login";
import Form, { DefaultForm } from "../form/Form";

export const LoginFormStyled = styled(DefaultForm)`
  && {
    max-width: ${ScreenBP.md}px
  }
`;

export default function LoginForm(props: PropsWithChildren<{}>) {
  const login = useLogin();
  return (
    <Form
      initialValues={loginFormInit}
      onSubmit={login}
      validationSchema={loginFormSchema}
      FormEl={LoginFormStyled}
    >
      {props.children}
    </Form>
  )
}