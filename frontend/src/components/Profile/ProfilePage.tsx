import React, { useState } from 'react';
import { Typography, Button, Snackbar, Alert } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { UserActionTypes } from 'redux/action-types/userActionTypes';
import { UserForm } from 'redux/ts-types/user';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useDispatch } from 'react-redux';

import {
  ProfileContentWrapper,
  ProfileFormWrapper,
  ProfileUsertWrapper
} from './styles';
import BasicTabs from './BasicTabs';
import { SaveGroup } from './SaveGroup/SaveGroup';
import { EditGroup } from './EditGroup/EditGroup';

interface ProfilePageProps {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date | string;
  // imageUrl: string;
  description: string;
}

export default function ProfilePage({
  id,
  email,
  displayName,
  createdAt,
  description
}: ProfilePageProps) {
  const { control } = useForm<UserForm>({
    mode: 'onBlur',
    defaultValues: { displayName, description }
  });
  const dispatch = useDispatch();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [userImage, setUserImage] = useState<File | null>();
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
        setTimeout(() => setSuccessMessage(false), 3000);
        dispatch({
          type: UserActionTypes.UPDATE_USER,
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
          <SaveGroup
            onSubmit={onSubmit}
            displayName={displayName}
            description={displayName}
            closeEditData={closeEditData}
            setUserImage={setUserImage}
          />
        ) : (
          <EditGroup displayName={displayName} editData={editData} />
        )}
        <Typography variant="h5" component="h4" align="center">
          {t('profile.profilePage.creationDate')} {createdAt}
        </Typography>
        <Typography variant="h5" component="h5" align="center">
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
