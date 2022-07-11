import React, { useEffect, useState } from 'react';
import {
  CardContent,
  List,
  Skeleton,
  Typography,
  Stack,
  Divider,
  CircularProgress
} from '@mui/material';
import { StyledCommentsLoaderBox } from 'components/design/StyledCommentsLoaderBox';
import { t } from 'i18next';
import { useInView } from 'react-intersection-observer';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { CommentType, AuthorInfoType } from '../../../../types';
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentSection = () => {
  const { ref, inView } = useInView({ threshold: 0 });
  const commentStepCount = 5;

  const { _id: locationId } = useTypedSelector(
    state => state.popupLocation.data
  );
  const { comments } = useTypedSelector(state => state.locationComments);
  const { fetchComments } = useTypedDispatch();
  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
  );

  const topComments = comments.filter(c => !c.parentComment);

  const [topCommentsOnPageIndex, setTopCommentsOnPageIndex] =
    useState(commentStepCount);

  const [topCommentsOnPage, setTopCommentsOnPage] = useState(
    topComments.slice(0, commentStepCount)
  );

  useEffect(() => {
    if (locationId) {
      fetchComments(locationId);
    }
  }, [locationId]);

  useEffect(() => {
    const addMoreComment = () =>
      setTopCommentsOnPageIndex(prevState => prevState + commentStepCount);

    const timerId = setTimeout(() => addMoreComment(), 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [inView]);

  useEffect(() => {
    setTopCommentsOnPage(topComments.slice(0, topCommentsOnPageIndex));
  }, [comments, topCommentsOnPageIndex]);

  return (
    <CardContent>
      <Divider sx={{ mb: 4 }}>
        {t('bigPopup.commentSection.commentSection.commentsSection')}
        {comments &&
          ` ${t('bigPopup.commentSection.commentSection.numberOfCommentars')} ${
            comments.length
          }`}
      </Divider>
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
        <>
          <List>
            {topCommentsOnPage.map(
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
                  authorRole={author.role}
                  authorsImage={author.imageUrl}
                  authorsName={author.displayName}
                  createdAt={createdAt!}
                  text={text}
                  id={commentId}
                  locationId={locationId}
                  likes={likes}
                  dislikes={dislikes}
                  parentComment={parentComment}
                  deleted={deleted}
                />
              )
            )}
          </List>
          {topComments.length > topCommentsOnPageIndex && (
            <StyledCommentsLoaderBox ref={ref}>
              {t('bigPopup.commentSection.commentSection.commentsLoading')}
              <CircularProgress />
            </StyledCommentsLoaderBox>
          )}
        </>
      )}
    </CardContent>
  );
};

export default CommentSection;
