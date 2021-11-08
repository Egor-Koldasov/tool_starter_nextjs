import { AppProps } from 'next/dist/next-server/lib/router/router'
import {ApolloProvider} from '@apollo/client'
import '../../styles/globals.scss'
import { getApolloClient } from '../lib/apolloClient'
import RootProvider from '../components/RootProvider';

function App({ Component, pageProps }: AppProps) {
  const client = getApolloClient();
  return (
    <RootProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </RootProvider>

  )
}

export default App
