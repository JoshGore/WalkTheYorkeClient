import React from 'react';
import { List, Paper } from '@material-ui/core';
// import CommentGroup from './CommentGroup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Comment from './Comment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const Comments: React.FC = () => {
  const classes = useStyles();
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  return (
    <Paper>
      <List className={classes.root}>
        <Comment level={1} firstname="Joshua" lastname="Gore" body={lorem} />
        <Comment level={2} firstname="Joshua" lastname="Gore" body={lorem} />
        <Comment level={2} firstname="Joshua" lastname="Gore" body={lorem} />
        <Comment level={2} firstname="Joshua" lastname="Gore" body={lorem} />
        <Comment level={1} firstname="Joshua" lastname="Gore" body={lorem} />
        <Comment level={2} firstname="Joshua" lastname="Gore" body={lorem} />
        <Comment level={2} firstname="Joshua" lastname="Gore" body={lorem} />
        <Comment level={1} firstname="Joshua" lastname="Gore" body={lorem} />
      </List>
    </Paper>
  );
};

export default Comments;
