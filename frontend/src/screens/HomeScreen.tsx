import { Container } from '@mui/material';
import Map from 'components/Map';
import SendFileFormTest from 'components/SendFileFormTest';
import React from 'react';

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
