/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  selectIsUserAuthorized,
  selectIsUserAuthorizedLoading
} from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
import {
  selectUserDataError,
  selectUserDataLoading
} from 'redux/memoizedSelectors/userDataSelectors';
import {
  selectPrivateUserDataError,
  selectPrivateUserDataLoading
} from 'redux/memoizedSelectors/privatUserDataSelectors';
import ProfilePage from './ProfilePage';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';
import CircularLoader from '../../components/CircularLoader/CircularLoader';

function Profile() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const isAuthorized = useTypedSelector(selectIsUserAuthorized);
  const isAuthLoading = useTypedSelector(selectIsUserAuthorizedLoading);

  const userError = useTypedSelector(selectUserDataError);
  const userLoading = useTypedSelector(selectUserDataLoading);

  const privateUserError = useTypedSelector(selectPrivateUserDataError);
  const privateUserLoading = useTypedSelector(selectPrivateUserDataLoading);

  const { fetchPrivateUserData } = useTypedDispatch();

  useEffect(() => {
    if (!isAuthLoading) {
      if (isAuthorized && accessToken) {
        fetchPrivateUserData(accessToken);
      }
    }
    if (!accessToken || (!isAuthLoading && !isAuthorized)) navigate('/');
  }, [isAuthorized]);

  if (userLoading || privateUserLoading) {
    return <CircularLoader />;
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
      {accessToken && !isAuthLoading && isAuthorized && <ProfilePage />}
    </Box>
  );
}

export default Profile;
