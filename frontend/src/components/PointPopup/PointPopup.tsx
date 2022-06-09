import CommentSection from 'components/BigPopup/CommentSection/CommentSection';
import React, { useState, MouseEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { CardComponent } from './СardComponent/CardComponent';
import { IconsComponent } from './IconsComponent/IconsComponent';
import { StyledPopupButtonsWrapper } from '../design/StyledPopupButtonsWrapper';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState
} from 'react-hook-form';

import {
  CancelButton,
  EditButton,
  SaveBox,
  SaveButton
} from 'components/design/StyledProfile';
import { useTranslation } from 'react-i18next';
import { LocationForm } from '../../../types';
import { useDispatch } from 'react-redux';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { EditProfileSchema } from 'utils/validation';

const PointPopup = () => {
  const { t } = useTranslation();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const {
    updatePopupLocation,
    toggleVisitedField,
    toggleFavoriteField,
    updateLocationData
  } = useTypedDispatch();

  const {} = useTypedSelector(state => state);

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
    arrayPhotos
  } = useTypedSelector(state => state.popupLocation.data);

  // console.log(locationName, description, '>>>>>>>>>>>>>>>>>');

  const { handleSubmit, control, register } = useForm<LocationForm>({
    mode: 'onBlur',
    defaultValues: { locationName, description }
    // resolver: yupResolver(EditProfileSchema)
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

  const onSubmit: SubmitHandler<LocationForm> = async data => {
    const formData = new FormData();
    // if (userImage) {
    //   formData.append('image', userImage);
    // }
    // formData.append('id', id);
    formData.append('locationName', data.locationName);
    formData.append('description', data.description);

    updateLocationData(
      formData,
      t('profile.profilePage.profilePageUpdatedSuccessfully')
    );
  };

  console.log(onSubmit, 'onSubmit');

  const editData = () => {
    setShowEditPanel(true);
  };
  const closeEditData = () => {
    setShowEditPanel(false);
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
          {showEditPanel ? (
            <>
              <Controller
                control={control}
                name="locationName"
                render={({ field }) => (
                  <TextField
                    placeholder={t('profile.profilePage.enterName')}
                    label={t('profile.profilePage.name')}
                    fullWidth
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    defaultValue={locationName}
                    type="text"
                    error={!!errors.locationName?.message}
                    helperText={t(
                      !errors.locationName
                        ? ''
                        : String(errors.locationName.message)
                    )}
                  />
                )}
              />
              <SaveBox>
                <Stack direction="row" spacing={2}>
                  <SaveButton
                    size="large"
                    variant="contained"
                    type="submit"
                    onSubmit={handleSubmit(onSubmit)}
                    onClick={closeEditData}
                  >
                    {t('profile.profilePage.save')}
                  </SaveButton>
                  <CancelButton
                    size="large"
                    variant="contained"
                    onClick={closeEditData}
                  >
                    {t('profile.profilePage.cancel')}
                  </CancelButton>
                </Stack>
              </SaveBox>
            </>
          ) : (
            <Typography color="text.secondary" variant="h4" paddingX={5}>
              {locationName}
            </Typography>
          )}

          <EditButton size="large" variant="contained" onClick={editData}>
            {t('profile.profilePage.editProfile')}
          </EditButton>

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
  );
};
export default PointPopup;
