import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    messageTo: {
      borderRadius: '1px 15px 15px 15px',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    textField: {
      [`& fieldset`]: {
        borderRadius: '15px 15px 15px 15px',
      },
    },
    dense: {
      marginTop: theme.spacing(2),
    },
  })
);

const Message: React.FC<any> = ({ fromUser, message }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      wrap='nowrap'
      spacing={2}
      direction={fromUser ? 'row-reverse' : 'row'}
    >
      <Grid item>
        <Avatar>JG</Avatar>
      </Grid>
      <Grid item>
        <Paper className={fromUser ? classes.messageFrom : classes.messageTo}>
          {message}
        </Paper>
      </Grid>
    </Grid>
  );
};

const Messages: React.FC<any> = ({}) => {
  return (
    <>
      <Message fromUser={false} message={'test message 1'} />
      <Message fromUser={true} message={'test message 2 from me'} />
      <Message
        fromUser={false}
        message={
          'Molestie a iaculis at erat pellentesque adipiscing commodo elit. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et.'
        }
      />
      <Message
        fromUser={true}
        message={
          'Arcu vitae elementum curabitur vitae nunc. Nunc sed id semper risus in hendrerit gravida rutrum. Id venenatis a condimentum vitae. Neque ornare aenean euismod elementum. Habitant morbi tristique senectus et netus et malesuada. Senectus et netus et malesuada fames ac turpis egestas maecenas. Luctus venenatis lectus magna fringilla urna.'
        }
      />
    </>
  );
};

const MessageForm: React.FC<any> = ({}) => {
  const classes = useStyles();
  return (
    <TextField
      id='outlined-dense-multiline'
      label='start with @issue to submit issue'
      className={clsx(classes.textField, classes.dense)}
      margin='dense'
      variant='outlined'
      multiline
      rowsMax='4'
      fullWidth
    />
  );
};

const Chat: React.FC<any> = ({ comments }) => {
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
