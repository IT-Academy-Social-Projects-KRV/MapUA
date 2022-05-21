import React, { useState } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Comment } from '../../../redux/ts-types/popupLocation';

const CommentForm = () => {
  const [commentText, setCommentText] = useState('');
  const { sendComment } = useTypedDispatch();
  const { userInfo } = useTypedSelector(state => state.userAuth);
  const { _id } = useTypedSelector(state => state.popupLocation);

  const onSendComment = () => {
    const commentDate = {
      type: new Date(),
      default: null
    };
    /* eslint no-underscore-dangle: 0 */
    const commentBody: Comment = {
      author: userInfo.user._id,
      text: commentText,
      likes: [],
      dislikes: [],
      createdAt: commentDate,
      updatedAt: commentDate
    };
    if (commentText) {
      sendComment(_id!, commentBody);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <FormControl variant="standard">
        <TextField
          multiline
          rows={5}
          id="your comment"
          placeholder="Add your comment"
          variant="outlined"
          fullWidth
          onChange={e => setCommentText(e.target.value)}
          value={commentText}
        />

        <Button
          sx={{
            width: '25%',
            borderRadius: 10,
            alignSelf: 'center',
            mt: 2,
            color: 'black',
            mb: 3
          }}
          onClick={onSendComment}
          endIcon={<SendOutlinedIcon />}
        >
          Send
        </Button>
      </FormControl>
    </Box>
  );
};

export default CommentForm;
