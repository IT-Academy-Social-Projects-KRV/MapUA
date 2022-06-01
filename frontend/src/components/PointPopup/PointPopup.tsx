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
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import TourIcon from '@mui/icons-material/Tour';
import { useTranslation } from 'react-i18next';
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

  const { updatePopupLocation, toggleVisitedField, toggleFavoriteField } =
    useTypedDispatch();

  const { data: isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized
  );
  const {
    _id: userId,
    favorite,
    visited
  } = useTypedSelector(state => state.userData.data);

  const {
    _id: locationId,
    rating,
    locationName,
    description,
    arrayPhotos,
    createdAt,
    author
  } = useTypedSelector(state => state.popupLocation.data);

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

  const handleFavoriteClick = () => {
    if (isAuthorized) toggleFavoriteField(locationId);
  };
  const handleVisitedClick = () => {
    if (isAuthorized) toggleVisitedField(locationId);
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

    return updatePopupLocation(locationId, { rating: updatedRating });
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
                  favorite.includes(locationId)
                    ? `${t('pointPopUp.removeFromFavorite')}`
                    : `${t('pointPopUp.addToFavorite')}`
                }
              >
                {favorite.includes(locationId) ? (
                  <BookmarkIcon />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </IconButton>
              <IconButton
                size="small"
                onClick={handleVisitedClick}
                title={
                  visited.includes(locationId)
                    ? `${t('pointPopUp.removeFromVisited')}`
                    : `${t('pointPopUp.addToVisited')}`
                }
              >
                {visited.includes(locationId) ? (
                  <TourIcon />
                ) : (
                  <TourOutlinedIcon />
                )}
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
                aria-label="author"
                src={author?.imageUrl}
              />
              <Typography>{author?.displayName}</Typography>

              <Typography>{createdAt.toLocaleDateString()}</Typography>
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
