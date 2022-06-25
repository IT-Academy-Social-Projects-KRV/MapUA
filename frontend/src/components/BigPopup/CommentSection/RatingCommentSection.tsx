import React from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { IconButton, Typography, Stack } from '@mui/material';

interface Props {
  date: Date;
}

const RatingCommentSection = ({ date }: Props) => (
  <Stack
    direction="row"
    justifyContent="flex-end"
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
);

export default RatingCommentSection;
