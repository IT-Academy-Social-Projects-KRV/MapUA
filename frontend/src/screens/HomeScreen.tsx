import React from 'react';
import { Container, Box } from '@mui/material';
import Map from 'components/Map/index';
import SendFileFormTest from 'components/SendFileFormTest';

function HomeScreen() {
  return (
    <Box>
      <Container>
        <Map />
        <SendFileFormTest />
      </Container>
    </Box>
  );
}

export default HomeScreen;
