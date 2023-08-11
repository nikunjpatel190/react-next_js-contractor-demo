import type { AppProps } from 'next/app'
import 'regenerator-runtime/runtime';
import './common.css'
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}