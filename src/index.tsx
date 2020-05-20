import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import getApolloClient from './apollo/client';
import App from './containers/App/App';
import { ProvideContexts } from './context/global';
import { integrateSessionApolloRedux } from './integrations/Session-Apollo-Redux';
import createStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import { createLocalSessionKVStorage } from './util/keyvaluestore/localSessionStorage';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createDynamicLinkEnv } from './util/apollo/dynamicLink';
import * as Sentry from '@sentry/browser';
import * as K from './mn-constants';
import { typography, colors } from './mn-constants';
import { MngErrorLink } from 'fe/lib/graphql/ctx';
import media from 'styled-media-query';

K.SENTRY_KEY &&
  Sentry.init({
    dsn: K.SENTRY_KEY
  });

run();
async function run() {
  const Global = createGlobalStyle`
      body, html {
          border: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          font-family: ${typography.type.primary} !important;
      }
      
      * {
        box-sizing: border-box;
      }

      body {
      background: ${colors.app};
      overflow-y: scroll;
      overscroll-behavior-y: none;
      .ais-SearchBox {
        height: 42px;
        border-radius: 4px;
        border: 1px solid #dadada
        input {
          height: 40px;
          border: none;
          background: #fff;
          margin: 0 !important; 
          border-radius: 4px;
          text-indent: 30px;
          padding: 0;
        }
      }
      .ais-InstantSearch__root { 
        display: flex;
      width: 100%; }
      }

      .Toastify__toast-container--top-right{
        top:60px !important;
        ${media.lessThan('480px')` 
          width: 90vw !important;
          margin: 0 auto; 
        `}; 
    }
      
      
       
     
  `;
  const createLocalKVStore = createLocalSessionKVStorage('local');
  const store = createStore({ createLocalKVStore });

  const dynamicLinkEnv = createDynamicLinkEnv();

  const appLink = dynamicLinkEnv.link.concat(MngErrorLink);
  const apolloClient = await getApolloClient({
    localKVStore: createLocalKVStore('APOLLO#'),
    appLink,
    dispatch: store.dispatch
  });

  integrateSessionApolloRedux(
    dynamicLinkEnv.srv,
    store.dispatch,
    apolloClient.client
  );
  const ApolloApp = () => (
    <ApolloProvider client={apolloClient.client}>
      <ProvideContexts store={store} dynamicLinkSrv={dynamicLinkEnv.srv}>
        <Global />
        <ToastContainer
          hideProgressBar
          transition={Slide}
          autoClose={3000}
          newestOnTop
        />
        <App />
      </ProvideContexts>
    </ApolloProvider>
  );

  ReactDOM.render(<ApolloApp />, document.getElementById('root'));

  registerServiceWorker();
}
