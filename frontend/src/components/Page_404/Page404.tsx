import React from 'react';
import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledForPage404 } from './style';

// eslint-disable-next-line arrow-body-style
const Page404 = () => {
  const { t } = useTranslation();
  return (
    <StyledForPage404>
      <Box sx={{ marginTop: '20px' }}>
        <Link underline="none" component={RouterLink} to="/">
          {t('page404.Return to main page')}
        </Link>
      </Box>
    </StyledForPage404>
  );
};

export default Page404;
