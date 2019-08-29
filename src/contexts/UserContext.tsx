import React from 'react';

export interface UserProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  userId: number | undefined;
  setUserId: (userId: number) => void;
  username: string | undefined;
  setUsername: (username: string) => void;
  firstname: string | undefined;
  setFirstname: (firstname: string) => void;
  lastname: string | undefined;
  setLastname: (lastname: string) => void;
  signOut: () => void;
  loginMenuOpen: boolean;
  setLoginMenuOpen: (loginMenuOpen: boolean) => void;
}

const UserContext = React.createContext<UserProps>({
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
  signOut: () => {},
  loginMenuOpen: false,
  setLoginMenuOpen: () => {},
});

export default UserContext;
