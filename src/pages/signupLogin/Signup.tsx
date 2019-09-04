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

interface Inputs {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface SignupProps {
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

const Signup: React.FC<SignupProps> = ({ setNewUser }) => {
  const User = useContext<UserContextProps>(UserContext);
  const [signupFailed, setSignupFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<SubmissionErrors>({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const handleClose = () => {
    User.setLoginMenuOpen(false);
  };
  const handleSubmit = () => {
    setSubmitting(true);
    fetch('https://wty-hasura-auth-dev-2.herokuapp.com/signup', {
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
          setTimeout(() => User.setLoginMenuOpen(false), 1000);
        });
      }
    });
  };
  const handleChange = (name: keyof Inputs) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
      <DialogTitle>Sign Up</DialogTitle>
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
                onChange={handleChange('password')}
                fullWidth
                error={signupFailed}
                helperText={signupFailed && errors.password}
                autoComplete="new-password"
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
                autoComplete="new-password"
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
        <Button onClick={handleNewUser}>Login</Button>
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

export default Signup;
