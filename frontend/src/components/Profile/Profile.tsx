/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProfilePage from './ProfilePage';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { fetchPrivateUserData } from '../../redux/actions-creators/privateUserData';

function Profile() {
  const navigate = useNavigate();
  const { data: isAuthorized, loading: isAuthLoading } = useTypedSelector(
    state => state.isUserAuthorized
  );
  const { error: userError, loading: userLoading } = useTypedSelector(
    state => state.userData
  );
  const { error: privateUserError, loading: privateUserLoading } =
    useTypedSelector(state => state.privateUserData);

  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthLoading) {
      const accessToken = localStorage.getItem('accessToken');
      if (isAuthorized && accessToken) {
        fetchPrivateUserData(accessToken);
      } else {
        console.log(isAuthorized, accessToken);
        navigate('/');
      }
    }
  }, [isAuthorized]);

  if (userLoading || privateUserLoading) {
    return <h1>{t('profile.profile.loading')}</h1>;
  }

  if (userError || privateUserError) {
    return (
      <>
        {userError && <h1>{userError}</h1>}
        {privateUserError && <h1>{privateUserError}</h1>}
      </>
    );
  }

  return (
    <Box>
      <ProfilePage />
    </Box>
  );
}

export default Profile;
