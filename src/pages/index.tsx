import Head from 'next/head'
import styled from 'styled-components'
import Page from '../components/layout/Page'
import { parentHeight } from '../lib/styles/parentHeight'

export const ContainerStyled = styled.div.attrs(() => {className: 'container'})`
  text-align: center;
  h1 {
    position: relative; // https://stackoverflow.com/a/10018430/12148259
    top: 20%;
  }
`

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Tool Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContainerStyled>
        <h1 className="display-1 px-5">
          Welcome to the Tool Starter!
        </h1>
      </ContainerStyled>
    </Page>
  )
}
