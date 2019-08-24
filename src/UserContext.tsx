import React from 'react';

const UserContext = React.createContext<any>({
  loggedIn: false,
  setLoggedIn: () => {},
  userId: undefined,
  setUserId: () => {},
  username: undefined,
  setUsername: () => {},
  firstname: undefined,
  setFirstname: () => {},
  lastname: undefined,
  setLastname: () => {},
  showLoginMenu: false,
  setShowLoginMenu: () => {},
});

export default UserContext;
