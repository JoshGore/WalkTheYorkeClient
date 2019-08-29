import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Message from './Message';

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

const Messages: React.FC = () => (
  <>
    <Message
      fromUser={false}
      message="test message 1"
      user={{ firstName: 'Brian', lastName: 'Cumin' }}
    />
    <Message
      fromUser
      message="test message 2 from me"
      user={{ firstName: 'Archibald', lastName: 'Northbottom' }}
    />
    <Message
      fromUser={false}
      user={{ firstName: 'Hans', lastName: 'Down' }}
      message="Molestie a iaculis at erat pellentesque adipiscing commodo elit. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et."
    />
    <Message
      fromUser
      user={{ firstName: 'Archibald', lastName: 'Northbottom' }}
      message="Arcu vitae elementum curabitur vitae nunc. Nunc sed id semper risus in hendrerit gravida rutrum. Id venenatis a condimentum vitae. Neque ornare aenean euismod elementum. Habitant morbi tristique senectus et netus et malesuada. Senectus et netus et malesuada fames ac turpis egestas maecenas. Luctus venenatis lectus magna fringilla urna."
    />
  </>
);

export default Messages;
