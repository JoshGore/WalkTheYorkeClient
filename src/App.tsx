import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Home from './Home';

const client = new ApolloClient({
  uri: 'https://wty-dev-hasura.herokuapp.com/v1/graphql',
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Router>
      <Route
        path="/:type?/:id(\d+)?"
        render={RouteProps => <Home {...RouteProps} />}
      />
    </Router>
  </ApolloProvider>
);

export default App;
