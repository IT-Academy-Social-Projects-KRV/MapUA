import React, { useState } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Comment } from '../../../redux/ts-types/popupLocation';

const CommentForm = () => {
  const { t } = useTranslation();

  const [commentText, setCommentText] = useState('');
  const { sendComment } = useTypedDispatch();
  const { id: userId } = useTypedSelector(state => state.userAuth);
  const { _id: locationId } = useTypedSelector(state => state.popupLocation);

  const onSendComment = () => {
    const commentBody: Comment<string> = {
      author: userId,
      locationId: locationId || '',
      text: commentText,
      likes: [],
      dislikes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    if (commentText) {
      sendComment(commentBody);
      setCommentText('');
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
          placeholder={t('bigPopup.commentSection.commentForm.addComment')}
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
          {t('bigPopup.commentSection.commentForm.send')}
        </Button>
      </FormControl>
    </Box>
  );
};

export default CommentForm;
