import React, { memo, MouseEvent } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IconButton, Typography, Stack, Box } from '@mui/material';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import ReplyComment from './ReplyComment';

interface Props {
  id: string;
  date: Date;
  userId: string;
  role: string | null;
  disabledPressedButton: boolean;
  openEditOrReplyComment: Function;
  likes: string[];
  dislikes: string[];
}

const RatingCommentSection = ({
  id,
  date,
  disabledPressedButton,
  openEditOrReplyComment,
  userId,
  role,
  likes,
  dislikes
}: Props) => {
  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
  );
  const { editCommentRating } = useTypedDispatch();

  const handleCommentRating = (
    e: MouseEvent<HTMLButtonElement>,
    type: 'likes' | 'dislikes'
  ) => {
    e.preventDefault();
    const comment = {
      likes,
      dislikes
    };

    const updatedCommentRating = { ...comment };

    if (updatedCommentRating[type].includes(userId)) {
      updatedCommentRating[type] = updatedCommentRating[type].filter(
        value => value !== userId
      );
    } else {
      updatedCommentRating[type].push(userId);
    }

    const inverseType = type === 'likes' ? 'dislikes' : 'likes';

    if (updatedCommentRating[inverseType].includes(userId)) {
      updatedCommentRating[inverseType] = updatedCommentRating[
        inverseType
      ].filter(value => value !== userId);
    }

    return editCommentRating(updatedCommentRating, id);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      paddingY={4}
    >
      {(userId || role === 'moderator' || role === 'admin') && (
        <ReplyComment
          disabledPressedButton={disabledPressedButton}
          openEditOrReplyComment={openEditOrReplyComment}
        />
      )}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography mr={2} variant="subtitle2">
          {date.toLocaleDateString()}
        </Typography>

        <IconButton
          onClick={e => {
            if (isAuthorized) {
              handleCommentRating(e, 'likes');
            }
          }}
        >
          {likes.includes(userId) ? (
            <ThumbUpIcon fontSize="small" sx={{ mr: '5px' }} />
          ) : (
            <ThumbUpOutlinedIcon fontSize="small" sx={{ mr: '5px' }} />
          )}
          <Box component="div" fontSize="large" sx={{ display: 'inline' }}>
            {likes.length}
          </Box>
        </IconButton>

        <IconButton
          onClick={e => {
            if (isAuthorized) {
              handleCommentRating(e, 'dislikes');
            }
          }}
        >
          {dislikes.includes(userId) ? (
            <ThumbDownIcon fontSize="small" sx={{ mr: '5px' }} />
          ) : (
            <ThumbDownAltOutlinedIcon fontSize="small" sx={{ mr: '5px' }} />
          )}
          <Box component="div" fontSize="large" sx={{ display: 'inline' }}>
            {dislikes.length}
          </Box>
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default memo(RatingCommentSection);
