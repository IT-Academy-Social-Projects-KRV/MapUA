import React, { useEffect } from 'react';
import { CardContent, List, Skeleton, Typography, Stack } from '@mui/material';
import { t } from 'i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { CommentType, AuthorInfoType } from '../../../../types';
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentSection = () => {
  const { _id: locationId } = useTypedSelector(
    state => state.popupLocation.data
  );
  const { comments } = useTypedSelector(state => state.locationComments);
  const { fetchComments } = useTypedDispatch();
  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
  );

  const topComments = comments.filter(c => !c.parentComment);

  useEffect(() => {
    if (locationId) {
      fetchComments(locationId);
    }
  }, [locationId]);

  return (
    <CardContent>
      {isAuthorized && <CommentForm />}
      {!comments.length ? (
        <Stack spacing={1} mt={2}>
          <Skeleton />
          <Typography align="center">
            {t('bigPopup.commentSection.commentSection.noComments')}
          </Typography>
          <Typography variant="h1">
            {!comments.length && <Skeleton />}
          </Typography>
        </Stack>
      ) : (
        <List>
          {topComments.map(
            ({
              _id: commentId,
              text,
              author,
              createdAt,
              likes,
              dislikes,
              parentComment,
              deleted
            }: CommentType<AuthorInfoType>) => (
              <Comment
                index={0}
                comments={comments}
                key={commentId}
                authorId={author._id}
                createdAt={createdAt!}
                text={text}
                id={commentId}
                authorsImage={author.imageUrl}
                authorsName={author.displayName}
                locationId={locationId}
                likes={likes}
                dislikes={dislikes}
                parentComment={parentComment}
                deleted={deleted}
              />
            )
          )}
        </List>
      )}
    </CardContent>
  );
};

export default CommentSection;
