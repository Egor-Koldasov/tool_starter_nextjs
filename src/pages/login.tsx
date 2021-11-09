import { Form, Formik } from 'formik';
import Head from 'next/head';
import styled from 'styled-components';
import Page from '../components/layout/Page';
import loginInit from '../state/modules/login';
import SubmitButton from '../components/form/SubmitButton';
import LabeledInput from '../components/form/LabeledInput';

const ScreenBP = {
  md: 576,
}
const LoginForm = styled(Form)`
  && {
    max-width: ${ScreenBP.md}px
  }
`;

export default function Login() {
  return (
    <Page>
      <Head>
        <title>Login</title>
      </Head>
      <Formik
        initialValues={loginInit}
        onSubmit={console.log}
      >
        <LoginForm className="container py-3">
          <LabeledInput name="email" />
          <LabeledInput name="password" />
          <SubmitButton />
        </LoginForm>
      </Formik>
    </Page>
  )
}

