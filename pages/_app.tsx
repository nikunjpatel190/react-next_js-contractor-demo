import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import client from './../apollo/apollo';
import 'regenerator-runtime/runtime';
import '../public/assets/css/common.css'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}