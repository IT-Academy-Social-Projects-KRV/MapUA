import React from 'react';
import { CardContent, Divider, List, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentSection = () => {
  const { t } = useTranslation();

  const { comments } = useTypedSelector(state => state.popupLocation.data);
  const { data: isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized
  );
  return (
    <CardContent>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          textAlign: 'center',
          borderBottom: '1px solid grey'
        }}
      >
        {t('bigPopup.commentSection.commentSection.commentsSection')}
      </Typography>
      <List
        sx={{
          bgcolor: 'background.paper'
        }}
      >
        {isAuthorized && (
          <>
            <CommentForm />
            <Divider variant="inset" component="li" />
          </>
        )}
        {comments.map(({ text, author, createdAt }) => (
          <Comment
            key={author + text + createdAt}
            createdAt={createdAt}
            text={text}
          />
        ))}
      </List>
    </CardContent>
  );
};

export default CommentSection;
