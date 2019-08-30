import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Messages from './chat/Messages';
import TrailContext, { TrailProps } from '../../contexts/TrailContext';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: '#F5F5F5',
    padding: theme.spacing(2),
  },
  messageFrom: {
    borderRadius: '15px 1px 15px 15px',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  messageFromAvatar: {
    backgroundColor: theme.palette.primary.main,
  },
  messageTo: {
    borderRadius: '1px 15px 15px 15px',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
  },
  textField: {
    '& fieldset': {
      borderRadius: '15px 15px 15px 15px',
    },
  },
  dense: {
    marginTop: theme.spacing(2),
  },
}));

const MessageForm: React.FC = () => {
  const classes = useStyles();
  return (
    <TextField
      id="outlined-dense-multiline"
      label="start with @issue to submit issue"
      className={clsx(classes.textField, classes.dense)}
      margin="dense"
      variant="outlined"
      multiline
      rowsMax="4"
      fullWidth
    />
  );
};

const Chat: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container>
      <Grid item>
        <Messages />
      </Grid>
      <Grid item xs>
        <MessageForm />
      </Grid>
    </Grid>
  );
};

export default Chat;
