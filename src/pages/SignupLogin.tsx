import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserContext from '../contexts/UserContext';
import Signup from './signupLogin/Signup';
import Login from './signupLogin/Login';
import Logout from './signupLogin/Logout';

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

const SignupLogin: React.FC<any> = () => {
  const User = useContext<any>(UserContext);
  const [loadDetails, setLoadDetails] = useState(false);
  const setUserVariables = ({ users_by_pk: data } : any) => {
    User.setUsername(data.username);
    User.setFirstname(data.firstname);
    User.setLastname(data.lastname);
    User.setLoggedIn(true);
    User.setShowLoginMenu(false);
  };
  const { error: userLoadingError, data: userData } = useQuery(gql`
    query ($userId: Int!) {
      users_by_pk(id: $userId) {
        username
        firstname
        lastname
      }
    }
  `,
  {
    variables: { userId: User.userId },
    skip: !loadDetails,
    onCompleted: setUserVariables,
  });
  useEffect(() => {
    if (!!localStorage.getItem('authToken') && !!localStorage.getItem('userId')) {
      User.setUserId(localStorage.getItem('userId'));
      setLoadDetails(true);
    } else {
      User.setShowLoginMenu(true);
    }
  }, []);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [newUser, setNewUser] = useState(true);
  return (
    <Dialog open={User.showLoginMenu} fullScreen={fullScreen} onClose={() => User.setShowLoginMenu(false)}>
      {User.loggedIn && <Logout />}
      {!User.loggedIn && newUser && <Signup setNewUser={setNewUser} />}
      {!User.loggedIn && !newUser && <Login setNewUser={setNewUser} />}
    </Dialog>
  );
};

export default SignupLogin;
