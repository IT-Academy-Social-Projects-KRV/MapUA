import {
  Box,
  CardContent,
  List,
  Typography,
  FormControl,
  TextField,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Link
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import React from 'react';

const CommentSection = () => {
  return (
    <CardContent>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          textAlign: 'center',
          borderBottom: '1px solid grey'
        }}
      >
        Comments section
      </Typography>
      <List
        sx={{
          bgcolor: 'background.paper'
        }}
      >

        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
          <ListItemAvatar>
            <Avatar
              alt="Vasya"
              src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Nice place..."
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
      </List>
    </CardContent>
  );
};

export default CommentSection;
