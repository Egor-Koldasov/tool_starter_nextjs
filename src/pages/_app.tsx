import '../../styles/globals.scss'
import RootProvider from '../components/RootProvider';
import { AppProps as NextAppProps } from 'next/dist/shared/lib/router/router';
import { ComponentType } from 'react';
import PageLoader from '../components/PageLoader';
import { RootStateUpdate } from '../state/useUpdateModule';

export type PageProps = {
  initState?: RootStateUpdate
}
export interface AppProps extends NextAppProps {
  pageProps: PageProps,
  Component: ComponentType<PageProps>
}

function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider initState={pageProps?.initState}>
      <PageLoader {...{Component, pageProps}} />
    </RootProvider>
  )
}

export default App
