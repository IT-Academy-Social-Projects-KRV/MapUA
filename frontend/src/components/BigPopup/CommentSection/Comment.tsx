import React from 'react';
import { Avatar, IconButton, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { StyledCommentBox } from '../../design/StyledCommentBox';

interface Props {
  text: string;
  createdAt: Date;
  authorsName: string;
  authorsImage: string;
  authorId: string;
}

const Comment = ({
  text,
  createdAt,
  authorsName,
  authorsImage,
  authorId
}: Props) => {
  const date = new Date(createdAt);

  return (
    <ListItem alignItems="flex-start" sx={{ display: 'block', pl: 0 }}>
      <Link to={`/profile/${authorId}`}>
        <Avatar alt="Vasya" src={authorsImage} />
      </Link>
      <Link to={`/profile/${authorId}`}>
        <Typography component="span" variant="h6" color="text.primary">
          {authorsName}
        </Typography>
      </Link>
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
