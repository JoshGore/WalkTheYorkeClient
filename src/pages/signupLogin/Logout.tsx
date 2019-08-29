import React, { useContext } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Avatar,
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserContext from '../../contexts/UserContext';

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

const Logout: React.FC<any> = () => {
  const User = useContext<any>(UserContext);
  return (
    <>
      <DialogTitle>
        <Avatar style={{ marginRight: 'auto', marginLeft: 'auto' }}>
          <LockOpenIcon />
        </Avatar>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ textAlign: 'center', marginBottom: 0 }}>
          {`${User.firstname} ${User.lastname}`}
          <br />
          <i>
            {`${User.username}`}
          </i>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={User.signOut} style={{ margin: 'auto', color: '#bdbdbd' }}>
            Sign Out
          <ExitToAppIcon style={{ marginLeft: 4 }} />
        </Button>
      </DialogActions>
    </>
  );
};


export default Logout;
