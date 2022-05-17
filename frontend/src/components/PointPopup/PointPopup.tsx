import React, { useState, MouseEvent, SyntheticEvent } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Collapse,
  Avatar,
  Typography,
  Box,
  TextField,
  FormControl,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Snackbar,
  Alert,
  AlertColor
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';

interface INotification {
  type: AlertColor;
  message: string;
}

const PointPopup = () => {
  const [expanded, setExpanded] = useState(false);
  const [notification, setNotification] = useState<INotification | null>(null);

  const { updatePopupLocation } = useTypedDispatch();

  const userLogin = useTypedSelector(state => state.userLogin);
  const infoLocation = useTypedSelector(state => state.popupLocation);

  const {
    isLogged,
    userInfo: { user }
  } = userLogin;

  const { _id: userId } = user;
  const { _id, rating, locationName, description, photoSrc } = infoLocation;

  const handleCloseNotification = (
    e?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikes = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLogged) {
      return setNotification({
        type: 'warning',
        message: 'Login to your account to be able to likes!'
      });
    }
    const updatedRating = { ...rating };
    if (rating.likes.includes(userId)) {
      updatedRating.likes = updatedRating.likes.filter(
        value => value !== userId
      );
    } else {
      updatedRating.likes.push(userId);
    }

    if (rating.dislikes.includes(userId)) {
      updatedRating.dislikes = updatedRating.dislikes.filter(
        value => value !== userId
      );
    }

    return updatePopupLocation(_id, { rating: updatedRating });
  };

  const handleDislikes = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLogged) {
      return setNotification({
        type: 'warning',
        message: 'Login to your account to be able to likes!'
      });
    }
    const updatedRating = { ...rating };
    if (rating.dislikes.includes(userId)) {
      updatedRating.dislikes = updatedRating.dislikes.filter(
        value => value !== userId
      );
    } else {
      updatedRating.dislikes.push(userId);
    }

    if (rating.likes.includes(userId)) {
      updatedRating.likes = updatedRating.likes.filter(
        value => value !== userId
      );
    }

    return updatePopupLocation(_id, { rating: updatedRating });
  };

  let snackbar;
  if (notification) {
    snackbar = (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!notification}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Box>
      <Card>
        <CardMedia
          sx={{
            p: 3.2,
            pt: 0,
            pb: 0
          }}
          component="img"
          image={photoSrc}
          alt={locationName}
        />

        <Box>
          <Typography
            color="text.secondary"
            variant="h4"
            sx={{ pl: 5, pt: 2, mb: 2 }}
          >
            {locationName}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 5,
              pr: 10
            }}
          >
            <IconButton onClick={handleLikes}>
              {rating.likes.includes(userId) ? (
                <ThumbUpIcon
                  fontSize="small"
                  sx={{ color: 'text.secondary' }}
                />
              ) : (
                <ThumbUpOutlinedIcon
                  fontSize="small"
                  sx={{ color: 'text.secondary' }}
                />
              )}
              {rating.likes.length}
            </IconButton>

            <IconButton onClick={handleDislikes}>
              {rating.dislikes.includes(userId) ? (
                <ThumbDownIcon
                  fontSize="small"
                  sx={{ color: 'text.secondary' }}
                />
              ) : (
                <ThumbDownAltOutlinedIcon
                  fontSize="small"
                  sx={{ color: 'text.secondary' }}
                />
              )}
              {rating.dislikes.length}
            </IconButton>

            <IconButton size="small">To share</IconButton>

            <IconButton size="small">Add to visited</IconButton>
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </Box>
        </Box>

        <CardContent>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 5,
                mt: 5
              }}
            >
              This location created by:
              <Avatar
                sx={{ mt: -2 }}
                aria-label="avtor"
                src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
              />
              <Typography>Vasya</Typography>
              <Typography>June 22 2022</Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                mt: 5,
                p: 3,
                border: '1px solid grey '
              }}
            >
              {description}
            </Typography>
          </Box>
          <IconButton
            onClick={handleExpandClick}
            sx={{
              mt: 3,
              transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)'
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
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
            <List>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <FormControl variant="standard">
                  <TextField
                    multiline
                    rows={5}
                    id="your comment"
                    placeholder="Add your comment"
                    variant="outlined"
                    fullWidth
                  />

                  <Button
                    sx={{
                      width: '25%',
                      borderRadius: 10,
                      alignSelf: 'center',
                      mt: 2,
                      color: 'black',
                      mb: 3
                    }}
                    endIcon={<SendOutlinedIcon />}
                  >
                    Send
                  </Button>
                </FormControl>
              </Box>
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
                  <IconButton>
                    <ThumbUpOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton>
                    <ThumbDownAltOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </ListItem>
            </List>
          </CardContent>
        </Collapse>
        {snackbar}
      </Card>
    </Box>
  );
};
export default PointPopup;
