import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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

interface MessageProps {
  fromUser: boolean;
  message: string;
  user: {
    firstName: string,
    lastName: string
  };
}

const Message: React.FC<MessageProps> = ({
  fromUser,
  message,
  user: { firstName, lastName },
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      wrap="nowrap"
      spacing={2}
      direction={fromUser ? 'row-reverse' : 'row'}
    >
      <Grid item>
        <Avatar className={fromUser ? classes.messageFromAvatar : ''}>
          {`${firstName.charAt(0)}${lastName.charAt(0)}`}
        </Avatar>
      </Grid>
      <Grid item>
        <Paper className={fromUser ? classes.messageFrom : classes.messageTo}>
          {!fromUser && (
            <Typography variant="caption" color="textSecondary">
              {`${firstName} ${lastName}`}
            </Typography>
          )}
          <Typography variant="body1">{message}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Message;
