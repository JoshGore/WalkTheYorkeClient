import React, { useContext } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Avatar,
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import UserContext, { UserContextProps } from '../../contexts/UserContext';

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

const Logout: React.FC = () => {
  const User = useContext<UserContextProps>(UserContext);
  const closeDialog = () => {
    User.setLoginMenuOpen(false);
  };
  return (
    <>
      <IconButton
        onClick={closeDialog}
        style={{ position: 'absolute', top: 2, right: 2 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        <Avatar
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 10,
          }}
        >
          <LockOpenIcon />
        </Avatar>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ textAlign: 'center', marginBottom: 0 }}>
          {`${User.firstname} ${User.lastname}`}
          <br />
          <i>{`${User.username}`}</i>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={User.signOut}
          style={{ margin: 'auto', color: '#bdbdbd' }}
        >
          Sign Out
          <ExitToAppIcon style={{ marginLeft: 4 }} />
        </Button>
      </DialogActions>
    </>
  );
};

export default Logout;
