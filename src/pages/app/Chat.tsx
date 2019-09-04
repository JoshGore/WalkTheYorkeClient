import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Comments from './chat/Comments';
import CommentForm from './chat/CommentForm';
import TrailContext, { TrailContextProps } from '../../contexts/TrailContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#F5F5F5',
      padding: theme.spacing(2),
    },
    commentFrom: {
      borderRadius: '15px 1px 15px 15px',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    commentFromAvatar: {
      backgroundColor: theme.palette.primary.main,
    },
    commentTo: {
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
  }),
);

const Chat: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <Comments />
      </Grid>
    </Grid>
  );
};

export default Chat;
