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
  EditButton
} from './styles';
import BasicTabs from './BasicTabs';
import { UserForm } from '../../../types';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { deleteUserData, logout } = useTypedDispatch();
  const {
    _id: id,
    displayName,
    description,
    imageUrl: userAvatar
  } = useTypedSelector(state => state.userData.data);
  const { email, createdAt, updatedAt } = useTypedSelector(
    state => state.privateUserData.data
  );

  const { handleSubmit, control, register } = useForm<UserForm>({
    mode: 'onBlur',
    defaultValues: { displayName, description }
  });
  const dispatch = useDispatch();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [userImage, setUserImage] = useState<File | null>();

  const [newDescription, setNewDescription] = useState(description);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const handleDescription = (descriptionBasicTabs: any) => {
    setNewDescription(descriptionBasicTabs);
  };
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
        setTimeout(() => setSuccessMessage(false), 3000);
        dispatch({
          type: UserDataActionTypes.UPDATE_USER_DATA_SUCCESS,
          payload: response.data
        });
        setShowEditPanel(false);
      }
    } catch (e: any) {
      setTimeout(() => setErrorMessage(''), 3000);
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
  return (
    <ProfileFormWrapper>
      <ProfileContentWrapper>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={successMessage}
        >
          <Alert severity="success">
            {t('profile.profilePage.dataSuccessChanged')}
          </Alert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!!errorMessage}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>

        {showEditPanel ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <UploadBox>
                <ProfileAvatar
                  sx={{ ml: '11.5vh' }}
                  aria-label="avatar"
                  src={userAvatar}
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

            <EditButton
              sx={{ mt: '2vh' }}
              size="large"
              variant="contained"
              onClick={editData}
            >
              {t('profile.profilePage.editProfile')}
            </EditButton>
          </Box>
        )}
        <Typography variant="h5" component="h4" align="center">
          {t('profile.profilePage.creationDate')} {createdAt}
        </Typography>
        <Typography variant="h5" component="h4" align="center">
          {t('profile.profilePage.updateDate')} {updatedAt}
        </Typography>
        <Typography variant="h5" component="h5" align="center">
          {email}
        </Typography>
        <Button
          size="large"
          onClick={() => {
            deleteUserData();
            logout();
          }}
          variant="contained"
        >
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
