import CommentSection from 'components/BigPopup/CommentSection/CommentSection';
import React, { useState, MouseEvent, useEffect } from 'react';
import { Box, Card, CardContent, Collapse, Typography } from '@mui/material';
import AlertDialog from 'components/AlertDialog';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreatingLocationSchema } from 'utils/validation';
import EditLocation from 'components/EditLocation/EditLocation';
import { useTranslation } from 'react-i18next';
import { CardComponent } from './СardComponent/CardComponent';
import { IconsComponent } from './IconsComponent/IconsComponent';
import { StyledPopupButtonsWrapper } from '../design/StyledPopupButtonsWrapper';
import LocationImageCarousel from './LocationImageCarousel/LocationImageCarousel';
import CircularLoader from '../CircularLoader/CircularLoader';

import { LocationForm } from '../../../types';

type Props = {
  toggleClose: Function;
};
const PointPopup = ({ toggleClose }: Props) => {
  const { t } = useTranslation();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpen] = React.useState(false);

  const handleCloseDialog = () => setOpen(false);
  const handleOpenDialog = () => setOpen(true);

  const {
    updatePopupLocation,
    toggleVisitedField,
    toggleFavoriteField,
    deleteLocation,
    fetchLocations,
    clearPopupLocation
  } = useTypedDispatch();

  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
  );

  const { verificationStatus } = useTypedSelector(
    state => state.popupLocation.data
  );

  const { role } = useTypedSelector(state => state.isUserAuthorized.data);
  console.log(role);

  const {
    _id: userId,
    favorite,
    visited
  } = useTypedSelector(state => state.userData.data);

  const { author: locationAuthorId } = useTypedSelector(
    state => state.popupLocation.data
  );
  const isDeleted = useTypedSelector(state => state.deleteLocation.data);
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
  const handleDeleteClick = () => {
    if (isAuthorized)
      deleteLocation(locationId, t('pointPopUp.locationDelete'));
    handleCloseDialog();
  };

  const {
    bounds,
    locationName: searchName,
    selectedFilters,
    authorizedFilters
  } = useTypedSelector(state => state.mapInfo);

  useEffect(() => {
    if (isDeleted && locationId) {
      fetchLocations(bounds, searchName, selectedFilters, authorizedFilters);
      toggleClose();
      clearPopupLocation();
    }
  }, [isDeleted]);

  const handleRating = (
    e: MouseEvent<HTMLButtonElement>,
    type: 'likes' | 'dislikes'
  ) => {
    e.preventDefault();
    const updatedRating = { ...rating, verificationStatus };
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

    let status = verificationStatus;

    if (
      updatedRating.likes.length >= 5 &&
      verificationStatus === 'unverified'
    ) {
      status = 'waiting';
    } else if (
      updatedRating.likes.length < 5 &&
      verificationStatus === 'waiting'
    ) {
      status = 'unverified';
    }
    return updatePopupLocation(locationId, {
      rating: updatedRating,
      verificationStatus: status
    });
  };

  const editData = () => {
    setShowEditPanel(true);
  };

  const closeEditData = () => {
    setShowEditPanel(false);
  };

  const locationData = useTypedSelector(state => state.popupLocation);
  const { loading } = locationData;
  const deleteLocationLoading = useTypedSelector(
    state => state.deleteLocation.loading
  );

  if (loading || deleteLocationLoading) {
    return <CircularLoader />;
  }

  return (
    <Box>
      {(showEditPanel && locationAuthorId?._id === userId) ||
      (showEditPanel && role === 'moderator') ||
      (showEditPanel && role === 'admin') ? (
        <EditLocation
          locationNamelocationName={locationName}
          closeEditData={closeEditData}
          descriptiondescription={description}
          locationId={locationId}
        />
      ) : (
        <Box>
          <AlertDialog
            openDialog={openDialog}
            transmittHandlerFunction={handleDeleteClick}
            handleCloseDialog={handleCloseDialog}
            deletingObject={t('pointPopUp.alertdialogmessagedata')}
          />
          <Card>
            <LocationImageCarousel
              arrayPhotos={arrayPhotos}
              locationName={locationName}
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
                  handleDeleteClick={handleOpenDialog}
                  locationId={locationId}
                />
              </StyledPopupButtonsWrapper>
            </Box>

            <CardContent>
              <CardComponent
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
    </Box>
  );
};

export default PointPopup;
