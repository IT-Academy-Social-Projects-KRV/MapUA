import React, { memo, useEffect, useState } from 'react';
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
import { selectComments } from 'redux/memoizedSelectors/locationCommentsSelectors';
import {
  selectUserRole,
  selectIsUserAuthorized
} from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { selectLocationId } from 'redux/memoizedSelectors/popupLocationSelectors';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { CommentType, AuthorInfoType } from '../../../../types';
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentSection = () => {
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true
  });
  const commentStepCount = 5;

  const locationId = useTypedSelector(selectLocationId);
  const comments = useTypedSelector(selectComments);
  const isAuthorized = useTypedSelector(selectIsUserAuthorized);

  const myRole = useTypedSelector(selectUserRole);


  const { fetchComments } = useTypedDispatch();

  const topComments = comments.filter(
    (c: CommentType<AuthorInfoType>) => !c.parentComment
  );

  const [topCommentsOnPageIndex, setTopCommentsOnPageIndex] =
    useState(commentStepCount);

  useEffect(() => {
    const addMoreComment = () =>
      setTopCommentsOnPageIndex(prevState => prevState + commentStepCount);

    const timerId = setTimeout(() => addMoreComment(), 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [inView]);

  useEffect(() => {
    fetchComments(locationId, undefined, topCommentsOnPageIndex);
  }, [topCommentsOnPageIndex]);

  useEffect(() => {
    const downloadMoreComment = () =>
      setTopCommentsOnPageIndex(prevState => prevState + commentStepCount);

    const timerId = setTimeout(() => downloadMoreComment(), 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [inView]);

  useEffect(() => {
    fetchComments(locationId, undefined, topCommentsOnPageIndex);
  }, [topCommentsOnPageIndex]);

  return (
    <CardContent>
      <Divider sx={{ mb: 4 }}>
        {t('bigPopup.commentSection.commentSection.commentsSection')}
        {comments &&
          ` ${t('bigPopup.commentSection.commentSection.numberOfCommentars')} ${
            comments.length
          }`}
      </Divider>

      {isAuthorized && myRole !== 'bannedUser' && <CommentForm />}

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
            {topComments.map(
              ({
                _id: commentId,
                text,
                author,
                createdAt,
                likes,
                dislikes,
                parentComment,
                deleted,
                hasReplies
              }: CommentType<AuthorInfoType>) => (
                <Comment
                  index={0}
                  hasReplies={hasReplies}
                  topCommentsOnPageIndex={topCommentsOnPageIndex}
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
          {topComments.length >= topCommentsOnPageIndex && (
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

export default memo(CommentSection);
