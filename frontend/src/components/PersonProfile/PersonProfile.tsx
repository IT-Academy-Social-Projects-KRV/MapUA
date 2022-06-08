import React from 'react';
import { Box } from '@mui/material';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';
import PersonProfilePage from './PersonProfilePage';

function PersonProfile() {
  const { t } = useTranslation();
  const { error: userError, loading: userLoading } = useTypedSelector(
    state => state.userData
  );
  if (userLoading) {
    return <h1>{t('profile.profile.loading')}</h1>;
  }

  if (userError) {
    return <h1>{userError && <h1>{userError}</h1>}</h1>;
  }

  return (
    <Box>
      <PersonProfilePage />
    </Box>
  );
}

export default PersonProfile;
