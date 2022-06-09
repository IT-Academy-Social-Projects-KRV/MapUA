import React from 'react';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  Typography
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { StyledCommentBox } from '../../design/StyledCommentBox';

interface Props {
  text: string;
  createdAt: Date;
  authorsName: string;
  authorsImage: string;
}

const Comment = ({ text, createdAt, authorsName, authorsImage }: Props) => {
  const date = new Date(createdAt);

  return (
    <ListItem alignItems="flex-start" sx={{ display: 'block', pl: 0 }}>
      <ListItemAvatar>
        <Avatar alt="Vasya" src={authorsImage} />
        <Typography component="span" variant="h6" color="text.primary">
          {authorsName}
        </Typography>
      </ListItemAvatar>
      <Typography variant="subtitle1">{text}</Typography>
      <StyledCommentBox>
        <Typography variant="subtitle2">{date.toLocaleDateString()}</Typography>
        <IconButton>
          <ThumbUpOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <ThumbDownAltOutlinedIcon fontSize="small" />
        </IconButton>
      </StyledCommentBox>
    </ListItem>
  );
};
export default Comment;
