import React, { useState } from 'react';
import {
  ListItem,
  Divider,
  Avatar,
  Typography,
  Link,
  Chip,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dividerFullWidth: {
      marginTop: '5px',
      marginRight: theme.spacing(2),
      marginBottom: 0,
      marginLeft: theme.spacing(2),
    },
    dividerInset: {
      marginTop: '5px',
      marginRight: theme.spacing(2),
      marginBottom: 0,
      marginLeft: theme.spacing(9),
    },
    avatarFullWidth: {
      marginTop: '5px',
      marginRight: theme.spacing(2),
      marginBottom: 0,
      marginLeft: theme.spacing(0),
    },
    avatarInset: {
      marginTop: '5px',
      marginRight: theme.spacing(2),
      marginBottom: 0,
      marginLeft: theme.spacing(9),
    },
    typography: {
      marginTop: '5px',
      marginRight: theme.spacing(2),
      marginBottom: 0,
      marginLeft: theme.spacing(0),
    },
  }),
);

interface CommentProps {
  level: 1 | 2;
  firstname: string;
  lastname: string;
  body: string;
}

const Comment: React.FC<CommentProps> = ({
  level,
  firstname,
  lastname,
  body,
}) => {
  const classes = useStyles();
  const replyToComment = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(event);
  };
  const [isIssue, setIsIssue] = useState(true);
  const deleteIssue = () => setIsIssue(false);
  return (
    <>
      <ListItem style={{ alignItems: 'start' }}>
        <div className={classes.typography}>
          <div>
            <div>
              {isIssue && (
                <Chip size="small" label="@issue" onDelete={deleteIssue} />
              )}
            </div>
            <Avatar
              style={{ float: 'left' }}
              className={
                level === 1 ? classes.avatarFullWidth : classes.avatarInset
              }
            >{`${firstname.charAt(0)}${lastname.charAt(0)}`}</Avatar>
            <div
              className={
                level === 1 ? classes.avatarFullWidth : classes.avatarInset
              }
            >
              <Typography
                variant="subtitle2"
                display="inline"
              >{`${firstname} ${lastname} `}</Typography>
              <Typography variant="subtitle2" display="inline">
                5 days ago
              </Typography>
              <Typography variant="body2">{body}</Typography>
            </div>
            {level === 1 && (
              <div>
                <Link href="./" onClick={replyToComment}>
                  reply
                </Link>
              </div>
            )}
          </div>
        </div>
      </ListItem>
      <Divider
        className={
          level === 1 ? classes.dividerFullWidth : classes.dividerInset
        }
      />
    </>
  );
};

export default Comment;
