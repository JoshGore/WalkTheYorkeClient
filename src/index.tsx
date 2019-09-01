import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './pages/App';
import './index.css';
import 'typeface-roboto';
import UserProvider from './contexts/UserProvider';
import TrailProvider from './contexts/TrailProvider';
import * as serviceWorker from './serviceWorker';

import apolloClient from './contexts/apollo-client';


ReactDOM.render(
  <UserProvider>
    <TrailProvider>
      <ApolloProvider client={apolloClient}>
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
