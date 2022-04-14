import React from 'react';
import { Container } from '@mui/material';
import Map from 'components/Map';
import SendFileFormTest from 'components/SendFileFormTest';

function HomeScreen() {
  return (
    <Container>
      HomeScreen
      <Map />
      <SendFileFormTest />
    </Container>
  );
}

export default HomeScreen;
