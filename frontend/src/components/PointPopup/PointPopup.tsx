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
import { useForm, useFormState } from 'react-hook-form';
import { CardComponent } from './СardComponent/CardComponent';
import { IconsComponent } from './IconsComponent/IconsComponent';
import { StyledPopupButtonsWrapper } from '../design/StyledPopupButtonsWrapper';

import { LocationForm } from '../../../types';
import EditLocation from '../EditLocation/EditLocation';

import { yupResolver } from '@hookform/resolvers/yup';
import { CreatingLocationSchema } from 'utils/validation';

const PointPopup = () => {
  const [showEditPanel, setShowEditPanel] = useState(false);
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

  const { author: locationAuthorId } = useTypedSelector(
    state => state.popupLocation.data
  );

  const {
    _id: locationId,
    rating,
    locationName,
    description,
    arrayPhotos
  } = useTypedSelector(state => state.popupLocation.data);

  const { control } = useForm<LocationForm>({
    mode: 'onBlur',
    defaultValues: { locationName, description },
    resolver: yupResolver(CreatingLocationSchema)
  });

  const { errors } = useFormState({
    control
  });

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

  const editData = () => {
    setShowEditPanel(true);
  };

  const closeEditData = () => {
    setShowEditPanel(false);
  };

  return (
    <>
      {showEditPanel && locationAuthorId?._id === userId ? (
        <EditLocation
          locationNamelocationName={locationName}
          closeEditData={closeEditData}
          descriptiondescription={description}
          locationId={locationId}
        />
      ) : (
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
                  editData={editData}
                  locationAuthorId={locationAuthorId}
                />
              </StyledPopupButtonsWrapper>
            </Box>

            <CardContent>
              <CardComponent
                description={description}
                handleExpandClick={handleExpandClick}
                expanded={expanded}
                showEditPanel={showEditPanel}
                control={control}
                errors={errors}
              />
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CommentSection />
            </Collapse>
          </Card>
        </Box>
      )}
    </>
  );
};

export default PointPopup;
