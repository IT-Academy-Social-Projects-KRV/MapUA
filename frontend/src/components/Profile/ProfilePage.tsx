import React, { useState } from 'react';
import { Typography, Button, Box, TextField, Stack } from '@mui/material';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditProfileSchema } from 'utils/validation';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import UploadInputProfilePage from 'components/design/UploadInputProfilePage';
import userImageNotFound from '../../static/user-image-not-found.png';
import {
  ProfileAvatar,
  SaveButton,
  CancelButton,
  ProfileContentWrapper,
  ProfileFormWrapper,
  ProfileUserWrapper,
  SaveBox,
  UploadBox,
  SubscribeButton,
  TypographyDate
} from '../design/StyledProfile';
import BasicTabs from './BasicTabs';
import { UserForm } from '../../../types';

export default function ProfilePage() {
  const { t } = useTranslation();

  const { updateUserData, deleteUserData, deletePrivateUserData, logout } =
    useTypedDispatch();

  const {
    data: { _id: id, displayName, description, imageUrl: userAvatar }
  } = useTypedSelector(state => state.userData);
  const { email, createdAt, updatedAt } = useTypedSelector(
    state => state.privateUserData.data
  );
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [userImage, setUserImage] = useState<File | null>();

  const { handleSubmit, control, register } = useForm<UserForm>({
    mode: 'onBlur',
    defaultValues: { displayName, description },
    resolver: yupResolver(EditProfileSchema)
  });
  const { errors } = useFormState({
    control
  });

  const onSubmit: SubmitHandler<UserForm> = async data => {
    const formData = new FormData();
    if (userImage) {
      formData.append('image', userImage);
    }
    formData.append('id', id);
    formData.append('displayName', data.displayName);
    formData.append('description', data.description);
    updateUserData(
      formData,
      t('profile.profilePage.profilePageUpdatedSuccessfully')
    );
  };
  const editData = () => {
    setShowEditPanel(true);
  };
  const closeEditData = () => {
    setShowEditPanel(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <ProfileFormWrapper>
        <ProfileContentWrapper>
          {showEditPanel ? (
            <Box>
              <UploadBox>
                <ProfileAvatar
                  aria-label="avatar"
                  src={
                    (userImage && URL.createObjectURL(userImage)) || userAvatar
                  }
                />
                <UploadInputProfilePage
                  setUserImage={setUserImage}
                  register={register}
                />
              </UploadBox>
              <Controller
                control={control}
                name="displayName"
                render={({ field }) => (
                  <TextField
                    placeholder={t('profile.profilePage.enterName')}
                    label={t('profile.profilePage.name')}
                    fullWidth
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    defaultValue={field.value}
                    type="text"
                    error={!!errors.displayName?.message}
                    helperText={t(
                      !errors.displayName
                        ? ''
                        : String(errors.displayName.message)
                    )}
                  />
                )}
              />
              <SaveBox>
                <Stack direction="row" spacing={2}>
                  <SaveButton size="large" variant="contained" type="submit">
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
            </Box>
          ) : (
            <UploadBox>
              <ProfileAvatar
                aria-label="avatar"
                src={userAvatar || userImageNotFound}
              />
              <Typography mt={2} variant="h5" component="h4" align="center">
                {displayName === undefined
                  ? `${t('profile.profilePage.yourName')}`
                  : displayName}
              </Typography>

              <SubscribeButton
                size="large"
                variant="contained"
                onClick={editData}
              >
                {t('profile.profilePage.editProfile')}
              </SubscribeButton>
            </UploadBox>
          )}

          <TypographyDate variant="h6">
            {t('profile.profilePage.creationDate')}{' '}
            {new Date(createdAt).toLocaleDateString('en-GB')}
          </TypographyDate>
          <TypographyDate variant="h6">
            {t('profile.profilePage.updateDate')}{' '}
            {new Date(updatedAt).toLocaleDateString('en-GB')}
          </TypographyDate>
          <Typography variant="h6" component="h6" align="center">
            {email}
          </Typography>
          <Button
            size="large"
            onClick={() => {
              deleteUserData();
              deletePrivateUserData();
              logout();
            }}
            variant="contained"
          >
            {t('profile.profilePage.logout')}
          </Button>
        </ProfileContentWrapper>
        <ProfileUserWrapper>
          <BasicTabs
            error={errors.description}
            showEditPanel={showEditPanel}
            setShowEditPanel={setShowEditPanel}
            control={control}
          />
        </ProfileUserWrapper>
      </ProfileFormWrapper>
    </Box>
  );
}
