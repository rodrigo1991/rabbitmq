/* eslint-disable react/jsx-props-no-spreading */
import { CacheProvider, EmotionCache } from '@emotion/react';
import Router from 'next/router';
import { FC, ReactElement, ReactNode, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';

import createEmotionCache from '../components/createEmotionCache';
import CenterSpinner from '../components/commons/CenterSpinner';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

const MyApp: FC<AppPropsWithLayout> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', () => setLoading(true));

  Router.events.on('routeChangeComplete', () => setLoading(false));

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Defensoría</title>

        <link rel="manifest" href="/manifest.json" />
        <link href="/logo192.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/logo512.png" rel="icon" type="image/png" sizes="32x32" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      {loading && <CenterSpinner />}
      <Component {...pageProps} />
    </CacheProvider>
  );
};

export default MyApp;
