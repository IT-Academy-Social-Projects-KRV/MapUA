import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <Box
      sx={{
        m: 3,
        '&>*:not(:last-child)': {
          m: 3
        }
      }}
    >
      <Box
        sx={{
          mt: 3,
          p: 3,
          border: '1px solid black'
        }}
      >
        <Box>{`email: ${data.email}`}</Box>
        <Box>{`displayName: ${data.displayName}`}</Box>
        <Box>{`createdAt: ${data.createdAt}`}</Box>
      </Box>
    </Box>
  );
}

export default Profile;
