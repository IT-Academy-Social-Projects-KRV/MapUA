import CommentSection from 'components/BigPopup/CommentSection/CommentSection';
import React, { useState, MouseEvent, SyntheticEvent } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
  Snackbar,
  Alert,
  AlertColor
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';

interface INotification {
  type: AlertColor;
  message: string;
}

const PointPopup = () => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);
  const [notification, setNotification] = useState<INotification | null>(null);

  const { updatePopupLocation } = useTypedDispatch();

  const userAuth = useTypedSelector(state => state.userAuth);
  const userData = useTypedSelector(state => state.user);

  const infoLocation = useTypedSelector(state => state.popupLocation);

  const [locationIsFavorite, setLocationIsFavorite] = useState(
    infoLocation._id && userData.data.favorite.includes(infoLocation._id)
  );
  const [locationIsVisited, setLocationIsVisited] = useState(
    infoLocation._id && userData.data.visited.includes(infoLocation._id)
  );

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
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly'
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
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <IconButton size="small">{t('pointPopUp.toShare')}</IconButton>

              <IconButton size="small" onClick={handleFavoriteClick}>
                {locationIsFavorite
                  ? `${t('pointPopUp.removeFromFavorite')}`
                  : `${t('pointPopUp.addToFavorite')}`}
              </IconButton>

              <IconButton size="small" onClick={handleVisitedClick}>
                {locationIsVisited
                  ? `${t('pointPopUp.removeFromVisited')}`
                  : `${t('pointPopUp.addToVisited')}`}
              </IconButton>

              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
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
          <CommentSection />
        </Collapse>
        {snackbar}
      </Card>
    </Box>
  );
};
export default PointPopup;
