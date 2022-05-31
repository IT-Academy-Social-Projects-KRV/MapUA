import React from 'react';
import {
  Avatar,
  Box,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

interface Props {
  text: string;
  createdAt: Date;
  authorsName: string;
  authorsImage: string;
}

const Comment = ({ text, createdAt, authorsName, authorsImage }: Props) => {
  const date = new Date(createdAt);

  return (
    <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
      <ListItemAvatar>
        <Avatar alt="Vasya" src={authorsImage} />
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {authorsName}
        </Typography>
      </ListItemAvatar>
      <ListItemText primary={text} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 3,
          alignSelf: 'flex-end'
        }}
      >
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="caption"
          color="text.primary"
        >
          {date.toLocaleDateString()}
        </Typography>
        <Link
          href="/"
          sx={{ color: 'text.secondary' }}
          component="button"
          underline="none"
        >
          <ThumbUpOutlinedIcon fontSize="small" />
        </Link>

        <Link
          href="/"
          sx={{ color: 'text.secondary' }}
          component="button"
          underline="none"
        >
          <ThumbDownAltOutlinedIcon fontSize="small" />
        </Link>
      </Box>
    </ListItem>
  );
};
export default Comment;
