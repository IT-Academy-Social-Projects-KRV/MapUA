import React, { MouseEvent } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { IconButton, Typography, Stack } from '@mui/material';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import ReplyComment from './ReplyComment';

interface Props {
  _id: string;
  date: Date;
  userId: string;
  role: string | null;
  disabledPressedButton: boolean;
  openEditOrReplyComment: Function;
  likes: string[];
}

const RatingCommentSection = ({
  _id,
  date,
  disabledPressedButton,
  openEditOrReplyComment,
  userId,
  role,
  likes
}: Props) => {
  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
  );
  const { comments } = useTypedSelector(state => state.locationComments);
  console.log('comments', comments);

  const test = () => {
    console.log('aaaa', _id);
  };

  const handleCommentRating = (
    e: MouseEvent<HTMLButtonElement>,
    type: 'likes' | 'dislikes'
  ) => {
    e.preventDefault();
    if (type === 'likes') {
      likes.push(userId);
    }
    console.log('likes', likes);
    console.log('commentsAAA', comments);
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
          <ThumbUpOutlinedIcon fontSize="small" />
        </IconButton>

        <IconButton onClick={test}>
          <ThumbDownAltOutlinedIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default RatingCommentSection;
