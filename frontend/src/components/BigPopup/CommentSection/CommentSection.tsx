import React, { useEffect } from 'react';
import { CardContent, Divider, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { CommentType, AuthorInfoType } from '../../../../types';
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentSection = () => {
  const { t } = useTranslation();

  const { _id: locationId } = useTypedSelector(
    state => state.popupLocation.data
  );
  const { comments } = useTypedSelector(state => state.locationComments);
  const { fetchComments } = useTypedDispatch();
  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
  );

  useEffect(() => {
    if (locationId) {
      fetchComments(locationId);
    }
  }, [locationId]);

  return (
    <CardContent>
      <Divider>
        {t('bigPopup.commentSection.commentSection.commentsSection')}
        {comments &&
          ` ${t('bigPopup.commentSection.commentSection.numberOfCommentars')} ${
            comments.length
          }`}
      </Divider>
      <List>
        {isAuthorized && (
          <>
            <CommentForm />
            <Divider />
          </>
        )}
        {comments.map(
          ({
            _id: commentId,
            text,
            author,
            createdAt,
            likes,
            dislikes
          }: CommentType<AuthorInfoType>) => (
            <Comment
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
            />
          )
        )}
      </List>
    </CardContent>
  );
};

export default CommentSection;
