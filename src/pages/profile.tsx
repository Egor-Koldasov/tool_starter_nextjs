import Head from "next/head";
import { ContainerStyled } from ".";
import Page from "../components/layout/Page";
import { ssrRequireLogin } from "../state/modules/api/me";
import { useSelectorPath } from "../state/state-update";

export const getServerSideProps = ssrRequireLogin;

export default function Profile() {
  const email = useSelectorPath('api.me.data.email');
  return (
    <Page>
      <Head>
        <title>Profile</title>
      </Head>
      <ContainerStyled>
        {
          (email) ?
            <h1>You are entered as {email}</h1> :
            <h1>You are not logged in</h1>
        }
      </ContainerStyled>
    </Page>
  )
}
