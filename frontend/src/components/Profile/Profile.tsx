/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProfilePage from './ProfilePage';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';

function Profile() {
  const navigate = useNavigate();
  const { data: isAuthorized, loading: isAuthLoading } = useTypedSelector(
    state => state.isUserAuthorized
  );
  const { data, error, loading } = useTypedSelector(state => state.userData);
  const {
    data: privateData,
    error: pError,
    loading: pLoading
  } = useTypedSelector(state => state.privateUserData);
  const { fetchUserData } = useTypedDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthLoading) {
      const accessToken = localStorage.getItem('accessToken');
      if (isAuthorized) {
        // @ts-ignore
        fetchUserData(accessToken);
      } else {
        navigate('/');
      }
    }
  }, [isAuthorized]);

  if (loading || pLoading) {
    return <h1>{t('profile.profile.loading')}</h1>;
  }
  if (error || pError) {
    return <h1>{error}</h1>;
  }

  return (
    <Box>
      <ProfilePage
        // eslint-disable-next-line no-underscore-dangle
        id={data._id}
        email={privateData.email}
        displayName={data.displayName}
        createdAt={privateData.createdAt}
        imageUrl={data.imageUrl}
        description={data.description}
      />
    </Box>
  );
}

export default Profile;
