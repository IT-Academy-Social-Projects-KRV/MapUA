/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BigPopup from 'components/BigPopup';
// import Map from 'components/Map/index';
import ProfilePage from './ProfilePage';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';

function Profile() {
  const navigate = useNavigate();

  const { data, error, loading } = useTypedSelector(state => state.user);
  const { fetchUser } = useTypedDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchUser(accessToken);
    } else {
      navigate('/');
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
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
        imageUrl
      />
    </Box>
  );
}

export default Profile;
