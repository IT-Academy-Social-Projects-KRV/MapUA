import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledPage404 } from '../design/StyledPage404';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <StyledPage404>
      <Box my={5}>
        <IconButton component={RouterLink} to="/" color="info">
          {t('page404.Return to main page')}
        </IconButton>
      </Box>
    </StyledPage404>
  );
};

export default Page404;
