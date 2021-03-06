import Head from 'next/head';
import Page from '../components/layout/Page';
import LabeledInput from '../components/form/LabeledInput';
import { GetServerSideProps } from 'next';
import { ssrMe } from '../state/modules/api/me';
import { PageProps } from './_app';
import LoginForm from '../components/login/LoginForm';
import QueryFormBase from '../components/form/QueryFormBase';

export const getServerSideProps: GetServerSideProps<PageProps> = ssrMe

export default function Login(props: PageProps) {
  return (
    <Page contentClassName="pt-5">
      <Head>
        <title>Login</title>
      </Head>
      <QueryFormBase
        queryPath="api.login.query"
        Form={LoginForm}
        title="Login"
        submitLabel="Send"
      >
        <LabeledInput name="email" />
        <LabeledInput name="password" inputProps={{ type: 'password' }} />
      </QueryFormBase>
    </Page>
  )
}

