import React from 'react';
import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { StyledForPage404 } from './style';

// eslint-disable-next-line arrow-body-style
const Page404 = () => {
  return (
    <StyledForPage404>
      <Box sx={{ marginTop: '20px' }}>
        <Link underline="none" component={RouterLink} to="/">
          Return to main page
        </Link>
      </Box>
    </StyledForPage404>
  );
};

export default Page404;
