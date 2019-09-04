import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Comments from './chat/Comments';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#F5F5F5',
      padding: theme.spacing(2),
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
