import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import { environment } from './environments/environment';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { TransportWSLink } from './lib/TransportWSLink';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { AUTH_FEATURE_KEY, authReducer } from './app/auth.slice';
import { readToken } from './app/token';

import { BrowserRouter } from 'react-router-dom';

import { store, Context } from './store';

const httpLink = createHttpLink({
  uri: environment.gqlUrl,
});

const wsLink = new TransportWSLink({
  url: environment.wsUrl,
  connectionParams: () => {
    const token = readToken();
    return {
      authToken: token,
    }
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = readToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const authHttpLink = authLink.concat(httpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authHttpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      PeripheralGroup: {
        keyFields: ["ID"],
      },
      Peripheral: {
        keyFields: ["ID"],
      },
      Object3DReference: {
        keyFields: ["ID"],
      },
      Profile: {
        keyFields: ["ID"],
      },
    },
  }),
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
