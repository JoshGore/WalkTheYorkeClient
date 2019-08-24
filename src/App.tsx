import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Home from './Home';
import UserContext from './UserContext';

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

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState<undefined | number>(undefined);
  const [username, setUsername] = useState<undefined | string>(undefined);
  const [firstname, setFirstname] = useState<undefined | string>(undefined);
  const [lastname, setLastname] = useState<undefined | string>(undefined);
  const [showLoginMenu, setShowLoginMenu] = useState<boolean>(false);
  const signOut = () => {
    setLoggedIn(false);
    setUserId(undefined);
    setUsername(undefined);
    setFirstname(undefined);
    setLastname(undefined);
    localStorage.removeItem('useId');
    localStorage.removeItem('authToken');
  };
  return (
    <UserContext.Provider value={{
      loggedIn,
      setLoggedIn,
      userId,
      setUserId,
      username,
      setUsername,
      firstname,
      setFirstname,
      lastname,
      setLastname,
      showLoginMenu,
      setShowLoginMenu,
      signOut,
    }}
    >
      <ApolloProvider client={client}>
        <Router>
          <Route
            path="/:type?/:id(\d+)?"
            render={RouteProps => <Home {...RouteProps} />}
          />
        </Router>
      </ApolloProvider>
    </UserContext.Provider>
  );
};

export default App;
