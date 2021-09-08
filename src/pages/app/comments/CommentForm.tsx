import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import {
  TextField,
  InputAdornment,
  Chip,
  Grid,
  ListItem,
  IconButton,
} from '@material-ui/core';
import clsx from 'clsx';

interface SubmitCommentProps {
  commentText: string;
  commentThreadId?: number | undefined;
  typeId?: number | null;
}

interface CommentFormProps {
  commentThreadId?: number;
  submitComment: (options: SubmitCommentProps) => any;
  setShown?: (shown: boolean) => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const CommentForm: React.FC<CommentFormProps> = ({
  commentThreadId,
  submitComment,
  setShown,
}) => {
  const classes = useStyles({});
  const [commentText, setCommentText] = useState('');
  const [isIssue, setIsIssue] = useState(false);
  const onSubmitSucessful = () => {
    setCommentText('');
    setIsIssue(false);
    setShown !== undefined && setShown(false);
  };
  const handleSubmit = () => {
    if (commentText) {
      if (commentThreadId === undefined) {
        submitComment({ commentText, typeId: isIssue ? 27 : null }).then(
          onSubmitSucessful(),
        );
      } else {
        submitComment({
          commentText,
          typeId: isIssue ? 1 : null,
          commentThreadId,
        }).then(onSubmitSucessful());
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.slice(0, 6) === '#issue') {
      setIsIssue(true);
      setCommentText(event.target.value.substr(6));
    } else {
      setCommentText(event.target.value);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    } else if (
      event.key === 'Backspace' &&
      !target.selectionStart &&
      !target.selectionEnd
    ) {
      setIsIssue(false);
    }
  };
  const handleIssueDelete = () => {
    setIsIssue(false);
  };
  return (
    <ListItem>
      <Grid container alignItems="flex-end">
        <Grid item xs>
          <TextField
            id="outlined-dense-multiline"
            label="start with #issue to submit issue"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            multiline
            rowsMax="4"
            value={commentText}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: isIssue && (
                <InputAdornment position="start">
                  <Chip
                    label="#issue"
                    size="small"
                    onDelete={handleIssueDelete}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={handleSubmit}>
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default CommentForm;
