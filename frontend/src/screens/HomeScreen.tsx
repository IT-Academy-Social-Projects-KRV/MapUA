import { Container } from '@mui/material';
import Map from 'components/Map/index';
import SendFileFormTest from 'components/SendFileFormTest';
import React from 'react';

function HomeScreen() {
  return (
    <Container>
      <Map />
      <SendFileFormTest />
    </Container>
  );
}

export default HomeScreen;
