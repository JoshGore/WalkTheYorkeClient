import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider: React.FC = ({ children }) => {
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
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
