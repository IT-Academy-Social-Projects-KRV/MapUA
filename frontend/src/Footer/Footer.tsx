import React from 'react';
import { Box } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        width: '100%',
        height: '100px',
        padding: '30px 0 0 50px'
      }}
    >
      Developed by: WebUI Rivne
    </Box>
  );
}

export default Footer;
