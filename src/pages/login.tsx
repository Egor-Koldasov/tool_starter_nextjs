import { Form, Formik } from 'formik';
import Head from 'next/head';
import styled from 'styled-components';
import * as yup from 'yup';
import Page from '../components/layout/Page';
import loginInit from '../state/modules/login';
import SubmitButton from '../components/form/SubmitButton';
import LabeledInput from '../components/form/LabeledInput';
import { GetServerSideProps } from 'next';
import { getMe } from '../state/modules/user/me';
import { useSelectorPath } from '../state/state-update';
import { PageProps } from './_app';

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
  return { props: {initState: { me: {data: data.user} }} };
}

export default function Login(props: PageProps) {
  const email = useSelectorPath('me.data.email');
  const error = useSelectorPath('me.query.error');
  const loading = useSelectorPath('me.query.loading');
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
          // login({variables: values});
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

