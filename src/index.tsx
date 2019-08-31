import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import ApolloClient from 'apollo-boost';
// Remove the apollo-boost import and change to this:
/*
import {ApolloClient} from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
 */

import App from './pages/App';
import './index.css';
import 'typeface-roboto';
import UserProvider from './contexts/UserProvider';
import TrailProvider from './contexts/TrailProvider';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: 'https://wty-dev-hasura.herokuapp.com/v1/graphql',
  request: async operation => {
    const token = localStorage.getItem('authToken');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});
/*
interface Definition {
  kind: string;
  operation?: string;
}

const httpLink = new HttpLink({
  uri: 'ws://wty-dev-hasura.herokuapp.com/v1/graphql',
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('authToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
 */

/*
const wsLink = new WebSocketLink({
  uri: 'ws://wty-dev-hasura.herokuapp.com/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        authorization: localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : '',
      },
    },
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation }: Definition = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
 */

ReactDOM.render(
  <UserProvider>
    <TrailProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </TrailProvider>
  </UserProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
