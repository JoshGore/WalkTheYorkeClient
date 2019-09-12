import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState<undefined | number>(undefined);
  const [username, setUsername] = useState<undefined | string>(undefined);
  const [firstname, setFirstname] = useState<undefined | string>(undefined);
  const [lastname, setLastname] = useState<undefined | string>(undefined);
  // const [loginMenuOpen, setLoginMenuOpen] = useState<boolean>(!loggedIn);
  const [loginMenuOpen, setLoginMenuOpen] = useState<boolean>(false);
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
    <UserContext.Provider
      value={{
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
        loginMenuOpen,
        setLoginMenuOpen,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
