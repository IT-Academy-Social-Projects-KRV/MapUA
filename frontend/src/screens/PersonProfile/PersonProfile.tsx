import React from 'react';
import { Box } from '@mui/material';
import { selectOtherUserDataError } from 'redux/memoizedSelectors/otherUserDataSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import PersonProfilePage from './PersonProfilePage';

function PersonProfile() {
  const userError = useTypedSelector(selectOtherUserDataError);

  if (userError) {
    return <h1>{userError && <h6>{userError}</h6>}</h1>;
  }
  return (
    <Box>
      <PersonProfilePage />
    </Box>
  );
}

export default PersonProfile;
