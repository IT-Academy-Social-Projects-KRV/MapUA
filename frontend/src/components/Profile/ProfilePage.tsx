import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
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
  EditButton,
  TypographyDate
} from './styles';
import BasicTabs from './BasicTabs';
import { UserForm } from '../../../types';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { updateUserData, deleteUserData, deletePrivateUserData, logout } =
    useTypedDispatch();
  const {
    success: updateSuccess,
    error: updateError,
    data: { _id: id, displayName, description, imageUrl: userAvatar }
  } = useTypedSelector(state => state.userData);
  const { email, createdAt, updatedAt } = useTypedSelector(
    state => state.privateUserData.data
  );
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [userImage, setUserImage] = useState<File | null>();
  const [errorMessage, setErrorMessage] = useState('');

  const { handleSubmit, control, register } = useForm<UserForm>({
    mode: 'onBlur',
    defaultValues: { displayName, description },
    resolver: yupResolver(EditProfileSchema)
  });
  const { errors } = useFormState({
    control
  });
  useEffect(() => {
    if (updateError) {
      setTimeout(() => setErrorMessage(''), 3000);
      setErrorMessage(
        (typeof updateError === 'string' ? updateError : updateError.message) ||
          `${t('profile.profilePage.lostNetwork')}`
      );
    }
  }, [updateError]);
  useEffect(() => {
    if (updateSuccess) {
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
      setShowEditPanel(false);
    }
  }, [updateSuccess]);
  const onSubmit: SubmitHandler<UserForm> = async data => {
    const formData = new FormData();
    if (userImage) {
      formData.append('image', userImage);
    }
    formData.append('id', id);
    formData.append('displayName', data.displayName);
    formData.append('description', data.description);
    updateUserData(formData);
  };
  const editData = () => {
    setShowEditPanel(true);
  };
  const closeEditData = () => {
    setShowEditPanel(false);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage('');
    setSuccessMessage(false);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <ProfileFormWrapper>
        <ProfileContentWrapper>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ zIndex: 10000 }}
            open={successMessage}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert severity="success" onClose={handleClose} sx={{ mt: '4vh' }}>
              {t('profile.profilePage.dataSuccessChanged')}
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ zIndex: 10000 }}
            open={!!errorMessage}
            onClose={handleClose}
            autoHideDuration={3000}
          >
            <Alert onClose={handleClose} severity="error" sx={{ mt: '4vh' }}>
              {errorMessage}
            </Alert>
          </Snackbar>

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
              </SaveBox>
            </Box>
          ) : (
            <UploadBox>
              <ProfileAvatar
                aria-label="avatar"
                src={userAvatar || userImageNotFound}
              />
              <Typography
                sx={{ mt: '3vh' }}
                variant="h5"
                component="h4"
                align="center"
              >
                {displayName === undefined
                  ? `${t('profile.profilePage.yourName')}`
                  : displayName}
              </Typography>

              <EditButton size="large" variant="contained" onClick={editData}>
                {t('profile.profilePage.editProfile')}
              </EditButton>
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
