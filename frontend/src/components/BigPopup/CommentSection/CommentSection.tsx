import React, { useEffect } from 'react';
import { CardContent, Divider, List } from '@mui/material';
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
      {isAuthorized && (
        <>
          <CommentForm />
          <Divider />
        </>
      )}
      <List>
        {topComments.map(
          ({
            _id: commentId,
            text,
            author,
            createdAt,
            likes,
            dislikes,
            parentComment
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
            />
          )
        )}
      </List>
    </CardContent>
  );
};

export default CommentSection;
