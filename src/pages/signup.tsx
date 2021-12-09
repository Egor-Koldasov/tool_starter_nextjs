import Head from 'next/head';
import Page from '../components/layout/Page';
import LabeledInput from '../components/form/LabeledInput';
import { GetServerSideProps } from 'next';
import { ssrMe } from '../state/modules/api/me';
import { useSelectorPath } from "../state/useSelector";
import { PageProps } from './_app';
import { getErrorMessage } from '../lib/modules/query';
import SignupForm from '../components/signup/SignupForm';
import QueryFormBase from '../components/form/QueryFormBase';

export const getServerSideProps: GetServerSideProps<PageProps> = ssrMe

export default function Signup(props: PageProps) {
  const loading = useSelectorPath('api.signup.query.loading');
  const error = getErrorMessage(useSelectorPath('api.signup.query.error'));
  return (
    <Page contentClassName="pt-5">
      <Head>
        <title>Sign Up</title>
      </Head>
      <QueryFormBase
        queryPath="api.signup.query"
        Form={SignupForm}
        title="Sign Up"
        submitLabel="Send"
      >
        <LabeledInput name="email" />
        <LabeledInput name="password" inputProps={{ type: 'password' }} />
        <LabeledInput name="confirmPassword" label="Confirm Password" inputProps={{ type: 'password' }} />
      </QueryFormBase>
    </Page>
  )
}

