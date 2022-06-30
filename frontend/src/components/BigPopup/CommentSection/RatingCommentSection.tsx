import React from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { IconButton, Typography, Stack } from '@mui/material';
import ReplyComment from './ReplyComment';

interface Props {
  date: Date;
  userId: string;
  role: string | null;
  disabledPressedButton: boolean;
  openEditOrReplyComment: Function;
}

const RatingCommentSection = ({
  date,
  disabledPressedButton,
  openEditOrReplyComment,
  userId,
  role
}: Props) => (
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
      <IconButton>
        <ThumbUpOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton>
        <ThumbDownAltOutlinedIcon fontSize="small" />
      </IconButton>
    </Stack>
  </Stack>
);

export default RatingCommentSection;
