import { Form, Formik } from 'formik';
import Head from 'next/head';
import styled from 'styled-components';
import * as yup from 'yup';
import Page from '../components/layout/Page';
import {loginInit} from '../state/modules/login';
import SubmitButton from '../components/form/SubmitButton';
import LabeledInput from '../components/form/LabeledInput';
import { GetServerSideProps } from 'next';
import { getMe } from '../state/modules/api/me';
import { useSelectorPath } from '../state/state-update';
import { PageProps } from './_app';
import { useLogin } from '../state/modules/api/login';

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

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const data = await getMe(context);
  return { props: { initState: { api: { me: { data } } } } };
}

export default function Login(props: PageProps) {
  const email = useSelectorPath('api.me.data.email');
  const error = useSelectorPath('api.me.query.error');
  const loading = useSelectorPath('api.me.query.loading');
  const login = useLogin();
  return (
    <Page>
      <Head>
        <title>Login</title>
      </Head>
      <div>{email}</div>
      <Formik
        initialValues={loginInit}
        onSubmit={(values) => {
          console.log({ values });
          login(values);
        }}
        validationSchema={schema}
      >
        <LoginForm className="container py-3">
          <LabeledInput name="email" />
          <LabeledInput name="password" inputProps={{ type: 'password' }} />
          {error && <div className="invalid-feedback d-flex">{String(error)}</div>}
          <SubmitButton loading={loading} />
        </LoginForm>
      </Formik>
    </Page>
  )
}

