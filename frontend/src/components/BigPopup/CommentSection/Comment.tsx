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
  displayName: string;
  imageUrl: string;
}

const Comment = ({ text, createdAt, displayName, imageUrl }: Props) => {
  const d = new Date(createdAt);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hour = d.getHours();
  const minutes =
    d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;

  const formatedDate = `${day}-${month}-${year} ${hour}:${minutes}`;

  return (
    <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
      <ListItemAvatar>
        <Avatar alt="Vasya" src={imageUrl} />
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {displayName}
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
          {formatedDate}
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
