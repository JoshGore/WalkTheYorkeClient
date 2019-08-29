import React, { useState, useContext } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid, TextField, Button, CircularProgress,
} from '@material-ui/core';
import UserContext from '../../contexts/UserContext';

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

const Signup: React.FC<any> = ({ setNewUser, setOpen }) => {
  const User = useContext<any>(UserContext);
  const [signupFailed, setSignupFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const handleClose = () => {
    User.setShowLoginMenu(false);
  };
  const handleSubmit = () => {
    setSubmitting(true);
    fetch('https://wty-hasura-auth-dev-2.herokuapp.com/signup', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      response => {
        if (!response.ok) {
          response.json().then(json => {
            const jsonErrors: any = {};
            json.errors && json.errors.forEach((error: any) => {
              jsonErrors[error.param] = error.msg;
            });
            setErrors({ ...jsonErrors });
          });
          setSubmitting(false);
          setSignupFailed(true);
        } else {
          setSignupFailed(false);
          setSubmitting(false);
          response.json().then(json => {
            localStorage.setItem('authToken', json.token);
            localStorage.setItem('userId', json.id);
            User.setUserId(json.id);
            User.setUsername(json.username);
            User.setFirstname(json.firstname);
            User.setLastname(json.lastname);
            User.setLoggedIn(true);
            User.setShowLoginMenu(false);
          });
        }
      },
    );
  };
  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleNewUser = () => {
    setNewUser(false);
  };
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  return (
    <>
      <DialogTitle>
         Sign Up
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
            Create an account to submit issues, reviews, and comments.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                id="first-name"
                label="First Name"
                margin="dense"
                onChange={handleChange('firstname')}
                fullWidth
                error={signupFailed}
                helperText={signupFailed && errors.firstname}
                required
              >
                First Name
              </TextField>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                id="last-name"
                label="Last Name"
                margin="dense"
                onChange={handleChange('lastname')}
                fullWidth
                error={signupFailed}
                helperText={signupFailed && errors.lastname}
                required
              >
                Last Name
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                type="email"
                margin="dense"
                onChange={handleChange('username')}
                fullWidth
                error={signupFailed}
                helperText={signupFailed && errors.username}
                required
              >
                Email
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
                type="password"
                margin="dense"
                onChange={handleChange('password')}
                fullWidth
                error={signupFailed}
                helperText={signupFailed && errors.password}
                required
              >
                Password
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="confirm-password"
                label="Confirm Password"
                type="password"
                margin="dense"
                onChange={handleChange('confirmPassword')}
                fullWidth
                error={signupFailed}
                helperText={signupFailed && errors.confirmPassword}
                required
              >
                Confirm Password
              </TextField>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNewUser}>
            Login
        </Button>
        <div style={{ position: 'relative', marginLeft: 'auto' }}>
          <Button color="primary" disabled={submitting} onClick={handleSubmit}>
              Submit
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
        <Button color="primary" onClick={handleClose}>
            Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default Signup;
