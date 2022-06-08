import React from 'react';
import { Box } from '@mui/material';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import PersonProfilePage from './PersonProfilePage';

function PersonProfile() {
  const { error: userError } = useTypedSelector(state => state.otherUserData);
  if (userError) {
    return <h1>{userError && <span>{userError}</span>}</h1>;
  }
  return (
    <Box>
      <PersonProfilePage />
    </Box>
  );
}

export default PersonProfile;
