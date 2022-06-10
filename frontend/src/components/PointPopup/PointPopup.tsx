import CommentSection from 'components/BigPopup/CommentSection/CommentSection';
import React, { useState, MouseEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Typography
} from '@mui/material';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { CardComponent } from './СardComponent/CardComponent';
import { IconsComponent } from './IconsComponent/IconsComponent';
import { StyledPopupButtonsWrapper } from '../design/StyledPopupButtonsWrapper';

const PointPopup = () => {
  const [expanded, setExpanded] = useState(false);

  const { updatePopupLocation, toggleVisitedField, toggleFavoriteField } =
    useTypedDispatch();

  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
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
    arrayPhotos
  } = useTypedSelector(state => state.popupLocation.data);

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

  return (
    <Box>
      <Card>
        <CardMedia
          sx={{ p: 2 }}
          component="img"
          image={arrayPhotos[0]}
          alt={locationName}
        />

        <Box>
          <Typography color="text.secondary" variant="h4" paddingX={5}>
            {locationName}
          </Typography>
          <StyledPopupButtonsWrapper>
            <IconsComponent
              handleRating={handleRating}
              handleFavoriteClick={handleFavoriteClick}
              locationIsFavorite={favorite.includes(locationId)}
              locationIsVisited={visited.includes(locationId)}
              handleVisitedClick={handleVisitedClick}
            />
          </StyledPopupButtonsWrapper>
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
      </Card>
    </Box>
  );
};
export default PointPopup;
