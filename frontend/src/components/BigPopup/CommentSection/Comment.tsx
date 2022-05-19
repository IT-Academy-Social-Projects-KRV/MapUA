import React from 'react';
import {
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Typography,
  Box,
  Link
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

interface Props {
  text: string;
  createdAt: Date;
}

const Comment = ({ text, createdAt }: Props) => {
  const d = new Date(createdAt);
  const formatedDate = `${d.getDate()}-${
    d.getMonth() + 1
  }-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  return (
    <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
      <ListItemAvatar>
        <Avatar
          alt="Vasya"
          src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
        />
      </ListItemAvatar>
      <ListItemText
        primary={text}
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          />
        }
      />
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
          variant="body2"
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
