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
  const { isAuthorized } = useTypedSelector(state => state.userAuth);
  const { data, error, loading } = useTypedSelector(state => state.user);
  const { fetchUser } = useTypedDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthorized) {
      const accessToken = localStorage.getItem('accessToken');
      // @ts-ignore
      fetchUser(accessToken);
    } else {
      navigate('/');
    }
  }, [isAuthorized]);

  if (loading) {
    return <h1>{t('profile.profile.loading')}</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Box>
      <ProfilePage
        // eslint-disable-next-line no-underscore-dangle
        id={data._id}
        email={data.email}
        displayName={data.displayName}
        createdAt={data.createdAt}
        description={data.description}
      />
    </Box>
  );
}

export default Profile;
