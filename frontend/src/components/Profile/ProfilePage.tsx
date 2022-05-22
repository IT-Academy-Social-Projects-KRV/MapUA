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
import { UserActionTypes } from 'redux/action-types/userActionTypes';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { UserForm } from 'redux/ts-types/user';
import userImageNotFound from '../../static/user-image-not-found.png';
import {
  ProfileAvatar,
  SaveButton,
  CancelButton,
  ProfileContentWrapper,
  ProfileFormWrapper,
  ProfileUsertWrapper,
  SaveBox,
  UploadBox
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
  createdAt
}: ProfilePageProps) {
  const dispatch = useDispatch();
  const { handleSubmit, control, register } = useForm<UserForm>({
    mode: 'onBlur'
  });
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [userImage, setUserImage] = useState<File | null>();
  const userAvatar = useTypedSelector(state => state.user);
  const [, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const handleDescription = (descriptionBasicTabs: any) => {
    setDescription(descriptionBasicTabs);
  };
  const onSubmit: SubmitHandler<UserForm> = async data => {
    const formData = new FormData();
    if (userImage) {
      formData.append('image', userImage);
    }

    formData.append('id', id);
    formData.append('displayName', data.displayName);
    formData.append('description', data.description);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URI}user`,
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
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (e: any) {
      setTimeout(() => setErrorMessage(''), 3000);
      setErrorMessage(e.response.data?.error || 'Lost Network');
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
          <Alert severity="success">Data successfuly changed</Alert>
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
                  sx={{ ml: '6vh' }}
                  aria-label="avatar"
                  src={userAvatar.data.imageUrl}
                />
                <Box sx={{ m: '2vh 0 2vh 10vh' }}> Upload Photo</Box>
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
                    placeholder="Please enter your name"
                    label="Name"
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
                  Save
                </SaveButton>
                <CancelButton
                  size="large"
                  variant="contained"
                  onClick={closeEditData}
                >
                  Cancel
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
              {displayName === undefined ? 'Your name' : displayName}
            </Typography>
            <Button size="large" variant="contained" onClick={editData}>
              Edit Profile
            </Button>
          </Box>
        )}
        <Typography variant="h5" component="h4" align="center">
          Creation date: {createdAt}
        </Typography>
        <Typography variant="h5" component="h5" align="center">
          {email}
        </Typography>
        <Button size="large" variant="contained">
          Logout
        </Button>
      </ProfileContentWrapper>
      <ProfileUsertWrapper>
        <BasicTabs
          showEditPanel={showEditPanel}
          setShowEditPanel={setShowEditPanel}
          control={control}
          handleDescription={handleDescription}
        />
      </ProfileUsertWrapper>
    </ProfileFormWrapper>
  );
}
