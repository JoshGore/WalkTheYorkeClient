import React, { useState, useContext } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import UserContext, { UserContextProps } from '../../contexts/UserContext';

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

interface LoginProps {
  setNewUser: (newUser: boolean) => void;
}

interface SubmissionError {
  location: string;
  param: string;
  msg: string;
  value: string;
}

interface SubmissionErrors {
  firstname?: string;
  lastname?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

const Login: React.FC<LoginProps> = ({ setNewUser }) => {
  const User = useContext<UserContextProps>(UserContext);
  const [authFailed, setAuthFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<SubmissionErrors>({
    username: '',
    password: '',
  });
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const handleNewUser = () => {
    setNewUser(true);
  };
  const handleChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClose = () => {
    User.setLoginMenuOpen(false);
  };
  const handleSubmit = () => {
    setSubmitting(true);
    fetch(`${process.env.REACT_APP_AUTHENTICATION_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (!response.ok) {
        response.json().then(json => {
          const submissionErrors: SubmissionErrors = {};
          json.errors &&
            json.errors.forEach((error: SubmissionError) => {
              submissionErrors[error.param] = error.msg;
            });
          setErrors({ ...submissionErrors });
          if (json.error) {
            switch (json.error) {
              default:
                setErrors({ ...setErrors, password: json.error });
                break;
              case 'Invalid password':
                setErrors({ ...setErrors, password: json.error });
                break;
              case 'Unknown user':
                setErrors({ ...setErrors, username: json.error });
                break;
            }
          }
        });
        setSubmitting(false);
        setAuthFailed(true);
      } else {
        setSubmitting(false);
        response.json().then(json => {
          localStorage.setItem('authToken', json.token);
          localStorage.setItem('userId', json.id);
          User.setUserId(json.id);
          User.setUsername(json.username);
          User.setFirstname(json.firstname);
          User.setLastname(json.lastname);
          User.setLoggedIn(true);
          setTimeout(() => User.setLoginMenuOpen(false), 1000);
        });
      }
    });
  };
  return (
    <>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sign in to submit issues, reviews, and comments.
          <br />
          <b>
            We have an intermittent issue with the login server - if login fails
            refresh the page.
          </b>
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                type="email"
                margin="dense"
                helperText={authFailed && errors.username}
                error={authFailed}
                onChange={handleChange('username')}
                fullWidth
                autoComplete="username"
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
                error={authFailed}
                helperText={authFailed && errors.password}
                onChange={handleChange('password')}
                fullWidth
                autoComplete="current-password"
                required
              >
                Password
              </TextField>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNewUser}>Sign Up Instead</Button>
        <div style={{ position: 'relative', marginLeft: 'auto' }}>
          <Button color="primary" disabled={submitting} onClick={handleSubmit}>
            Submit
          </Button>
          {submitting && (
            <CircularProgress
              size={24}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12,
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

export default Login;
