import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularLoader() {
  return (
    <Box sx={{ position: 'absolute', top: '50%', right: '50%' }}>
      <CircularProgress />
    </Box>
  );
}
