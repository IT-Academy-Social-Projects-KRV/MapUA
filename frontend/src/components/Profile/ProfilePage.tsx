import React, { useState } from 'react';
import { Typography, Button, Box, TextField } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';
import { UserActionTypes } from 'redux/types/user';
import { useDispatch } from 'react-redux';
import userImageNotFound from '../../static/user-image-not-found.png';
import {
  ProfileAvatar,
  SaveButton,
  CancelButton,
  LogoutButton,
  ProfileContentWrapper,
  ProfileFormWrapper,
  ProfileUsertWrapper,
  SaveBox,
  UploadBox
} from './styles';
import BasicTabs from './BasicTabs';

interface ProfilePageProps {
  email: string;
  displayName: string;
  createdAt: Date | string;
  imageUrl: any;
}

export default function ProfilePage({
  email,
  displayName,
  createdAt,
  imageUrl
}: ProfilePageProps) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { handleSubmit, control, register } = useForm<ProfilePageProps>({
    mode: 'onBlur',
    defaultValues: {
      displayName
    }
  });
  const onSubmit: SubmitHandler<ProfilePageProps> = async data => {
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}profile`,
        data
      );
      if (response.status === 200) {
        console.log(response);
        dispatch({
          type: UserActionTypes.FETCH_USER_SUCCESS,
          payload: response
        });
      }
    } catch (e: any) {
      console.log(e.response.data?.error || 'Something went wrong');
    }
  };
  const editData = () => {
    setShow(true);
  };
  const closeEditData = () => {
    setShow(false);
  };
  return (
    <ProfileFormWrapper>
      <ProfileContentWrapper>
        {show ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <UploadBox>
                <ProfileAvatar
                  aria-label="avatar"
                  src={imageUrl || userImageNotFound}
                />
                Upload Photo
                <Box>
                  <input type="file" {...register('imageUrl')} />
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
            <ProfileAvatar aria-label="avatar" src={userImageNotFound} />
            <Typography variant="h5" component="h4" align="center">
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
        <LogoutButton size="large" variant="contained">
          Logout
        </LogoutButton>
      </ProfileContentWrapper>
      <ProfileUsertWrapper>
        <BasicTabs />
      </ProfileUsertWrapper>
    </ProfileFormWrapper>
  );
}
