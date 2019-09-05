import React, { useState, useContext } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  IconButton,
  Avatar,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import UserContext, { UserContextProps } from '../../contexts/UserContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 4,
      boxShadow: '4px 4px 10px -5px rgba(0,0,0,0.75)',
      padding: 0,
      zIndex: 99,
    },
    loggedIn: {
      backgroundColor: '#3f51b5',
    },
  }),
);

interface BodyTextProps {
  loading: boolean;
  body: string | undefined;
}

const CornerAvatar: React.FC = () => {
  const classes = useStyles();
  const User = useContext<UserContextProps>(UserContext);
  const handleLoginToggle = () => {
    User.setLoginMenuOpen(!User.loginMenuOpen);
  };
  return (
    <>
      <IconButton className={classes.button} onClick={handleLoginToggle}>
        <Avatar className={User.loggedIn ? classes.loggedIn : undefined}>
          {User.loggedIn ? (
            `${User.firstname!.charAt(0)}${User.lastname!.charAt(0)}`
          ) : (
            <PersonAddIcon />
          )}
        </Avatar>
      </IconButton>
    </>
  );
};

export default CornerAvatar;
