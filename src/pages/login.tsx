import { Form, Formik } from 'formik';
import Head from 'next/head';
import styled from 'styled-components';
import * as yup from 'yup';
import Page from '../components/layout/Page';
import loginInit from '../state/modules/login';
import SubmitButton from '../components/form/SubmitButton';
import LabeledInput from '../components/form/LabeledInput';
import { useMutation, useQuery, gql } from '@apollo/client';
import { ME, useLogin } from '../queries/auth';
import { User } from '../generated-types/schema';

const ScreenBP = {
  md: 576,
}
const LoginForm = styled(Form)`
  && {
    max-width: ${ScreenBP.md}px
  }
`;

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export default function Login() {
  const {data} = useQuery<{me: User}>(ME);
  const [login, {loading, error}] = useLogin();
  return (
    <Page>
      <Head>
        <title>Login</title>
      </Head>
      <div>{data?.me?.email}</div>
      <Formik
        initialValues={loginInit}
        onSubmit={(values) => {
          console.log({values});
          login({variables: values});
        }}
        validationSchema={schema}
      >
        <LoginForm className="container py-3">
          <LabeledInput name="email" />
          <LabeledInput name="password" inputProps={{type: 'password'}} />
          {error && <div className="invalid-feedback d-flex">{error?.message}</div>}
          <SubmitButton loading={loading} />
        </LoginForm>
      </Formik>
    </Page>
  )
}

