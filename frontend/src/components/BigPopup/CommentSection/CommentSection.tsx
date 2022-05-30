import React, { useEffect } from 'react';
import { CardContent, Divider, List, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentSection = () => {
  const { t } = useTranslation();

  const { _id: locationId } = useTypedSelector(state => state.popupLocation);
  const { comments } = useTypedSelector(state => state.locationComments);
  const { fetchComments } = useTypedDispatch();
  const { isAuthorized } = useTypedSelector(state => state.userAuth);

  useEffect(() => {
    if (locationId) {
      fetchComments(locationId);
    }
  }, [locationId]);

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
        {comments.map(({ _id: commentId, text, author, createdAt }) => (
          <Comment
            key={commentId}
            createdAt={createdAt}
            text={text}
            authorsImage={author.imageUrl}
            authorsName={author.displayName}
          />
        ))}
      </List>
    </CardContent>
  );
};

export default CommentSection;
