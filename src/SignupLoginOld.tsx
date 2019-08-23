import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress, FormControl, useMediaQuery, Grid,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const SignupLogin: React.FC<any> = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(true);
  const [values, setValues] = useState({ username: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClose = () => {
    console.log('Trying to close');
  };
  const handleSubmit = () => {
    console.log('submitting');
    console.log(JSON.stringify(values));
    setSubmitting(true);
    fetch('https://wty-hasura-auth-dev-2.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      response => {
        if (!response.ok) {
          setSubmitting(false);
          setError(true);
        } else {
          setSubmitting(false);
        }
        console.log(response);
      },
    );
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
        <DialogTitle>{newUser ? 'Sign Up' : 'Login'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              To submit issues, reviews, and comments please login.
          </DialogContentText>
          {newUser && (
            <>
              <TextField
                autoFocus
                id="username"
                label="Email"
                onChange={handleChange('username')}
                type="email"
                margin="dense"
                required
                fullWidth
                error={error}
              />
              <TextField
                id="password"
                label="Password"
                onChange={handleChange('password')}
                type="password"
                margin="dense"
                required
                fullWidth
                error={error}
                helperText={error && 'Email or Password Incorrect'}
              />
            </>
          )}
          {!newUser && (
            <>
              <TextField
                id="first-name"
                label="First Name"
                onChange={handleChange('firstName')}
                margin="dense"
                fullWidth
                required
              />
              <TextField
                id="last-name"
                label="Last Name"
                onChange={handleChange('lastName')}
                margin="dense"
                fullWidth
                required
              />
              <TextField
                autoFocus
                id="username"
                label="Email"
                onChange={handleChange('username')}
                type="email"
                margin="dense"
                required
                fullWidth
                error={error}
              />
              <TextField
                id="password"
                label="Password"
                onChange={handleChange('password')}
                type="password"
                margin="dense"
                required
                fullWidth
                error={error}
                helperText={error && 'Email or Password Incorrect'}
              />
              <TextField
                id="confirm-password"
                label="Confirm Password"
                onChange={handleChange('confirmPassword')}
                type="password"
                margin="dense"
                required
                fullWidth
                error={error}
                helperText={error && 'Email or Password Incorrect'}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <div style={{ position: 'relative', marginLeft: 'auto' }}>
            <Button color="primary" onClick={handleSubmit} disabled={error}>
              Sign In
            </Button>
            {submitting && (
            <CircularProgress
              size={24}
              style={{
                position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12,
              }}
            />
            )}
          </div>
          <Button color="primary">
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SignupLogin;
