/* eslint-disable react/jsx-props-no-spreading */
import NProgress from 'nprogress';
import Router from 'next/router';
import '../components/styles/nprogress.css';
import Page from '../components/Page';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function myApp({ Component, pageProps }) {
  return (
    <div>
      <Page>
        <Component {...pageProps} />
      </Page>
    </div>
  );
}
