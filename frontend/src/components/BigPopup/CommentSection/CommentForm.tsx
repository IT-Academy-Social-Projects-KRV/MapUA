import React, { useState } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { CommentType } from '../../../../types';

const CommentForm = () => {
  const { t } = useTranslation();

  const [commentText, setCommentText] = useState('');
  const { sendComment } = useTypedDispatch();
  const { _id: userId } = useTypedSelector(state => state.userData.data);
  const { _id: locationId } = useTypedSelector(
    state => state.popupLocation.data
  );

  const onSendComment = () => {
    const commentBody: CommentType<string> = {
      author: userId,
      locationId: locationId!,
      text: commentText,
      likes: [],
      dislikes: []
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
