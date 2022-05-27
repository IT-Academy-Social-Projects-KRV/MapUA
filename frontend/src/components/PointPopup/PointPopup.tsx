<<<<<<< HEAD
=======
import CommentSection from 'components/BigPopup/CommentSection/CommentSection';
>>>>>>> 519b063ea3bc0a5e45c176e8e92205645c4834e6
import React, { useState, MouseEvent, SyntheticEvent } from 'react';
import {
  Avatar,
  Box,
<<<<<<< HEAD
  TextField,
  FormControl,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
=======
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
>>>>>>> 519b063ea3bc0a5e45c176e8e92205645c4834e6
  Snackbar,
  Alert,
  AlertColor
} from '@mui/material';
<<<<<<< HEAD
=======
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import TourIcon from '@mui/icons-material/Tour';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
>>>>>>> 519b063ea3bc0a5e45c176e8e92205645c4834e6
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
<<<<<<< HEAD
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
=======
>>>>>>> 519b063ea3bc0a5e45c176e8e92205645c4834e6
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';

interface INotification {
  type: AlertColor;
  message: string;
}

const PointPopup = () => {
<<<<<<< HEAD
=======
  const { t } = useTranslation();

>>>>>>> 519b063ea3bc0a5e45c176e8e92205645c4834e6
  const [expanded, setExpanded] = useState(false);
  const [notification, setNotification] = useState<INotification | null>(null);

  const { updatePopupLocation } = useTypedDispatch();

  const userAuth = useTypedSelector(state => state.userAuth);
<<<<<<< HEAD
  const infoLocation = useTypedSelector(state => state.popupLocation);

=======
  const userData = useTypedSelector(state => state.user);

  const infoLocation = useTypedSelector(state => state.popupLocation);

  const [locationIsFavorite, setLocationIsFavorite] = useState(
    infoLocation._id && userData.data.favorite.includes(infoLocation._id)
  );
  const [locationIsVisited, setLocationIsVisited] = useState(
    infoLocation._id && userData.data.visited.includes(infoLocation._id)
  );

>>>>>>> 519b063ea3bc0a5e45c176e8e92205645c4834e6
  const { isAuthorized, id: userId } = userAuth;

  const { _id, rating, locationName, description, arrayPhotos } = infoLocation;

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
  const handleFavoriteClick = async () => {
    // console.log(locationIsFavorite);
    const result = await axios.put(
      `${process.env.REACT_APP_API_URI}tougleFavorite`,
      {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        idOfLocation: infoLocation._id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    );
    if (result.status === 200) {
      setLocationIsFavorite(!locationIsFavorite);
    }
  };
  const handleVisitedClick = async () => {
    const result = await axios.put(
      `${process.env.REACT_APP_API_URI}tougleVisited`,
      {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        idOfLocation: infoLocation._id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    );
    if (result.status === 200) {
      setLocationIsVisited(!locationIsVisited);
    }
  };

  const handleRating = (
    e: MouseEvent<HTMLButtonElement>,
    type: 'likes' | 'dislikes'
  ) => {
    e.preventDefault();
    if (!isAuthorized) {
      return setNotification({
        type: 'warning',
        message: `${t('pointPopUp.message')}`
      });
    }

    const updatedRating = { ...rating };
    if (rating[type].includes(userId)) {
      updatedRating[type] = updatedRating[type].filter(
        value => value !== userId
      );
    } else {
      updatedRating[type].push(userId);
    }

    const inverseType = type === 'likes' ? 'dislikes' : 'likes';

    if (rating[inverseType].includes(userId)) {
      updatedRating[inverseType] = updatedRating[inverseType].filter(
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

  const handleRating = (
    e: MouseEvent<HTMLButtonElement>,
    type: 'likes' | 'dislikes'
  ) => {
    e.preventDefault();
    if (!isAuthorized) {
      return setNotification({
        type: 'warning',
        message: 'Login to your account to be able to rate!'
      });
    }

    const updatedRating = { ...rating };
    if (rating[type].includes(userId)) {
      updatedRating[type] = updatedRating[type].filter(
        value => value !== userId
      );
    } else {
      updatedRating[type].push(userId);
    }

    const inverseType = type === 'likes' ? 'dislikes' : 'likes';

    if (rating[inverseType].includes(userId)) {
      updatedRating[inverseType] = updatedRating[inverseType].filter(
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
          image={arrayPhotos[0]}
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
              flexDirection: 'column',
              m: 3
            }}
          >
<<<<<<< HEAD
            <IconButton onClick={e => handleRating(e, 'likes')}>
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

            <IconButton onClick={e => handleRating(e, 'dislikes')}>
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
=======
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <IconButton onClick={e => handleRating(e, 'likes')}>
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

              <IconButton onClick={e => handleRating(e, 'dislikes')}>
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

              <IconButton size="small" title={t('pointPopUp.toShare')}>
                <ShareIcon />
              </IconButton>

              <IconButton
                size="small"
                onClick={handleFavoriteClick}
                title={
                  locationIsFavorite
                    ? `${t('pointPopUp.removeFromFavorite')}`
                    : `${t('pointPopUp.addToFavorite')}`
                }
              >
                {locationIsFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
              <IconButton
                size="small"
                onClick={handleVisitedClick}
                title={
                  locationIsVisited
                    ? `${t('pointPopUp.removeFromVisited')}`
                    : `${t('pointPopUp.addToVisited')}`
                }
              >
                {locationIsVisited ? <TourIcon /> : <TourOutlinedIcon />}
              </IconButton>

              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
>>>>>>> 519b063ea3bc0a5e45c176e8e92205645c4834e6
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
              {t('pointPopUp.locationCreatedBy')}
              <Avatar
                sx={{ mt: -2 }}
                aria-label="author"
                src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
              />
              {/* todo change to infoLocation.authorName */}
              <Typography>{userData.data.displayName}</Typography>

              <Typography>
                {infoLocation.createdAt.toLocaleDateString()}
              </Typography>
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
<<<<<<< HEAD
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
=======
          <CommentSection />
>>>>>>> 519b063ea3bc0a5e45c176e8e92205645c4834e6
        </Collapse>
        {snackbar}
      </Card>
    </Box>
  );
};
export default PointPopup;
