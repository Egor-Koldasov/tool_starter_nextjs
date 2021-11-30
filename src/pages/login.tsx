import Head from 'next/head';
import Page from '../components/layout/Page';
import SubmitButton from '../components/form/SubmitButton';
import LabeledInput from '../components/form/LabeledInput';
import { GetServerSideProps } from 'next';
import { ssrMe } from '../state/modules/api/me';
import { useSelectorPath } from "../state/useSelector";
import { PageProps } from './_app';
import { getErrorMessage } from '../lib/modules/query';
import LoginForm from '../components/login/LoginForm';

export const getServerSideProps: GetServerSideProps<PageProps> = ssrMe

export default function Login(props: PageProps) {
  const loading = useSelectorPath('api.login.query.loading');
  const error = getErrorMessage(useSelectorPath('api.login.query.error'));
  return (
    <Page>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm>
        <LabeledInput name="email" />
        <LabeledInput name="password" inputProps={{ type: 'password' }} />
        {error && <div className="invalid-feedback d-flex">{String(error)}</div>}
        <SubmitButton loading={loading} />
      </LoginForm>
    </Page>
  )
}

