import type { AppProps } from 'next/app';
import '../styles/global.css';
import { DefaultSeo } from 'next-seo';
import { SEO } from '../next-seo-config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
