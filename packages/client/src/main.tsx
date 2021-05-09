import 'minireset.css';

import * as ApolloClient from '@apollo/client';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDom from 'react-router-dom';

import * as App from './app/app';
import { createStore } from './app/ui/store';
import { ErrorBoundary } from './ErrorBoundary';
import * as Modules from './modules';

const store = createStore();

const render = () => {
  ReactDOM.render(
    <ErrorBoundary>
      <React.StrictMode>
        <ApolloClient.ApolloProvider client={Modules.Apollo.client}>
          <ReactRouterDom.BrowserRouter>
            <ReactRedux.Provider store={store}>
              <App.Component />
            </ReactRedux.Provider>
          </ReactRouterDom.BrowserRouter>
        </ApolloClient.ApolloProvider>
      </React.StrictMode>
    </ErrorBoundary>,
    document.getElementById('root')
  );
};

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

if (module.hot) {
  module.hot.accept('./app/app', () => {
    const nextApp = require('./app/app').default;
    // @ts-ignore
    render(nextApp);
  });
}

render();
