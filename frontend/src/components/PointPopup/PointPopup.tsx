import CommentSection from 'components/BigPopup/CommentSection/CommentSection';
import React, { useState, MouseEvent, SyntheticEvent, useEffect } from 'react';
import {
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
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { CardComponent } from './СardComponent/CardComponent';
import { IconsComponent } from './IconsComponent/IconsComponent';

interface INotification {
  type: AlertColor;
  message: string;
}

type Props = {
  toggleClose: Function;
};

const PointPopup = (props: Props) => {
  const { toggleClose } = props;
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);
  const [notification, setNotification] = useState<INotification | null>(null);

  const {
    updatePopupLocation,
    toggleVisitedField,
    toggleFavoriteField,
    deletePopupLocation,
    fetchLocations
  } = useTypedDispatch();

  const { data: isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized
  );

  const {
    bounds,
    locationName: searchName,
    selectedFilters
  } = useTypedSelector(state => state.mapInfo);

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
    author
  } = useTypedSelector(state => state.popupLocation.data);

  console.log(author);
  const { success } = useTypedSelector(state => state.popupLocation);
  const [pageLoadSuccess, setPageLoadSuccess] = useState<Boolean>(false);

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
  const handleDeleteClick = () => {
    if (isAuthorized) deletePopupLocation(locationId);
  };

  useEffect(() => {
    if (success) {
      setPageLoadSuccess(true);
    }
  }, [success]);

  useEffect(() => {
    if (locationId === '' && pageLoadSuccess) {
      fetchLocations(bounds, searchName, selectedFilters);
      toggleClose();
      setPageLoadSuccess(false);
    }
  }, [locationId]);

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
              <IconsComponent
                handleRating={handleRating}
                handleFavoriteClick={handleFavoriteClick}
                locationIsFavorite={favorite.includes(locationId)}
                locationIsVisited={visited.includes(locationId)}
                handleVisitedClick={handleVisitedClick}
                handleDeleteClick={handleDeleteClick}
                authorOfThisLocation={author && author._id === userId}
              />
            </Box>
          </Box>
        </Box>

        <CardContent>
          <CardComponent
            description={description}
            handleExpandClick={handleExpandClick}
            expanded={expanded}
          />
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
