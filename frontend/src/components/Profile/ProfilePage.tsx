import React, { useState } from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
  Snackbar,
  Alert,
  Input
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { UserActionTypes } from 'redux/action-types/userActionTypes';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { UserForm } from 'redux/ts-types/user';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useDispatch } from 'react-redux';
import userImageNotFound from '../../static/user-image-not-found.png';
import {
  ProfileAvatar,
  SaveButton,
  CancelButton,
  ProfileContentWrapper,
  ProfileFormWrapper,
  ProfileUsertWrapper,
  SaveBox,
  UploadBox,
  EditButton,
  TypographyDate
} from './styles';
import BasicTabs from './BasicTabs';

interface ProfilePageProps {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date | string;
  imageUrl: string;
  description: string;
}

export default function ProfilePage({
  id,
  email,
  displayName,
  createdAt,
  description
}: ProfilePageProps) {
  const { handleSubmit, control, register } = useForm<UserForm>({
    mode: 'onBlur',
    defaultValues: { displayName, description }
  });
  const dispatch = useDispatch();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [userImage, setUserImage] = useState<File | null>();
  const userAvatar = useTypedSelector(state => state.user);
  const [newDescription, setNewDescription] = useState(description);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const { logout } = useTypedDispatch();
  const handleDescription = (descriptionBasicTabs: any) => {
    setNewDescription(descriptionBasicTabs);
  };
  const { t } = useTranslation();
  const onSubmit: SubmitHandler<UserForm> = async data => {
    const formData = new FormData();
    if (userImage) {
      formData.append('image', userImage);
    }
    formData.append('id', id);
    formData.append('displayName', data.displayName);
    formData.append('description', newDescription);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URI}profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 200) {
        setSuccessMessage(true);
        dispatch({
          type: UserActionTypes.UPDATE_USER,
          payload: response.data
        });
        setShowEditPanel(false);
      }
    } catch (e: any) {
      setErrorMessage(
        e.response.data?.error || `${t('profile.profilePage.lostNetwork')}`
      );
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <UploadBox>
                <ProfileAvatar
                  aria-label="avatar"
                  src={userAvatar.data.imageUrl}
                />
                <Box sx={{ m: '2vh 0 2vh 14vh' }}>
                  {t('profile.profilePage.uploadPhoto')}
                </Box>
                <Box>
                  <Button>
                    <Input
                      type="file"
                      {...register('imageUrl')}
                      onChange={(e: any) => setUserImage(e.target?.files?.[0])}
                    />
                  </Button>
                </Box>
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
          </form>
        ) : (
          <Box>
            <ProfileAvatar
              aria-label="avatar"
              src={userAvatar.data.imageUrl || userImageNotFound}
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
          </Box>
        )}
        <TypographyDate variant="h6">
          {t('profile.profilePage.creationDate')} {createdAt}
        </TypographyDate>
        <Typography variant="h6" component="h6" align="center">
          {email}
        </Typography>
        <Button size="large" onClick={logout} variant="contained">
          {t('profile.profilePage.logout')}
        </Button>
      </ProfileContentWrapper>
      <ProfileUsertWrapper>
        <BasicTabs
          showEditPanel={showEditPanel}
          setShowEditPanel={setShowEditPanel}
          control={control}
          handleDescription={handleDescription}
          newDescription={newDescription}
        />
      </ProfileUsertWrapper>
    </ProfileFormWrapper>
  );
}
