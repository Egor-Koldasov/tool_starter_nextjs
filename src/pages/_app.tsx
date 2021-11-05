import { AppProps } from 'next/dist/next-server/lib/router/router'
import {ApolloProvider} from '@apollo/client'
import '../../styles/globals.scss'
import { getApolloClient } from '../lib/apolloClient'

function App({ Component, pageProps }: AppProps) {
  const client = getApolloClient();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
