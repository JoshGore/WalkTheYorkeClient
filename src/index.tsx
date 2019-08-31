import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
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
