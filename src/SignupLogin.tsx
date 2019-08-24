import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, TextField, useMediaQuery, Button, CircularProgress, Avatar,
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useTheme } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserContext from './UserContext';

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
            json.errors.forEach((error: any) => {
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

const Login: React.FC<any> = ({ setNewUser, setOpen }) => {
  const User = useContext<any>(UserContext);
  const [authFailed, setAuthFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({
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
  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClose = () => {
    User.setShowLoginMenu(false);
  };
  const handleSubmit = () => {
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
          response.json().then(json => {
            const jsonErrors: any = {};
            json.errors && json.errors.forEach((error: any) => {
              jsonErrors[error.param] = error.msg;
            });
            setErrors({ ...jsonErrors });
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
            User.setShowLoginMenu(false);
          });
        }
      },
    );
  };
  return (
    <>
      <DialogTitle>
      Sign In
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        Sign in to submit issues, reviews, and comments.
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
                helperText={authFailed && (errors.password)}
                onChange={handleChange('password')}
                fullWidth
                required
              >
                Password
              </TextField>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNewUser}>
          Sign Up
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

const UserDetails: React.FC<any> = () => {
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
  const { error: userError, data: userData } = useQuery(gql`
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
      {User.loggedIn && <UserDetails />}
      {!User.loggedIn && newUser && <Signup setNewUser={setNewUser} />}
      {!User.loggedIn && !newUser && <Login setNewUser={setNewUser} />}
    </Dialog>
  );
};

export default SignupLogin;