import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import { environment } from './environments/environment';

import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { AUTH_FEATURE_KEY, authReducer } from './app/auth.slice';
import { readToken } from './app/token';

import { BrowserRouter } from 'react-router-dom';

import { POINTER_FEATURE_KEY, pointerReducer } from './app/pointer.slice';

const httpLink = createHttpLink({
  uri: environment.gqlUrl,
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

import { store, Context } from './store';

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
