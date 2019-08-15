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
      [`& fieldset`]: {
        borderRadius: '15px 15px 15px 15px',
      },
    },
    dense: {
      marginTop: theme.spacing(2),
    },
  })
);

const Message: React.FC<any> = ({
  fromUser,
  message,
  user: { firstName, lastName },
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      wrap='nowrap'
      spacing={2}
      direction={fromUser ? 'row-reverse' : 'row'}
    >
      <Grid item>
        <Avatar
          className={fromUser && classes.messageFromAvatar}
        >{`${firstName.charAt(0)}${lastName.charAt(0)}`}</Avatar>
      </Grid>
      <Grid item>
        <Paper className={fromUser ? classes.messageFrom : classes.messageTo}>
          {!fromUser && (
            <Typography
              variant='caption'
              color='textSecondary'
            >{`${firstName} ${lastName}`}</Typography>
          )}
          <Typography variant='body1'>{message}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

const Messages: React.FC<any> = ({}) => {
  return (
    <>
      <Message
        fromUser={false}
        message={'test message 1'}
        user={{ firstName: 'Brian', lastName: 'Cumin' }}
      />
      <Message
        fromUser={true}
        message={'test message 2 from me'}
        user={{ firstName: 'Archibald', lastName: 'Northbottom' }}
      />
      <Message
        fromUser={false}
        user={{ firstName: 'Hans', lastName: 'Down' }}
        message={
          'Molestie a iaculis at erat pellentesque adipiscing commodo elit. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et.'
        }
      />
      <Message
        fromUser={true}
        user={{ firstName: 'Archibald', lastName: 'Northbottom' }}
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
