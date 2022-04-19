import React, { useState } from 'react';
import { Button, Container, Box } from '@mui/material';
import Map from 'components/Map/index';
import SendFileFormTest from 'components/SendFileFormTest';
import BigPopup from 'components/BigPopup/index';
import PlaceIcon from '@mui/icons-material/Place';

function HomeScreen() {
  const [isOpen, setIsopen] = useState(false);
  return (
    <Box>
      <BigPopup isOpen={isOpen} toggleClose={() => setIsopen(false)} />
      <Button variant="text" onClick={() => setIsopen(true)} sx={{ ml: 100 }}>
        <PlaceIcon />
      </Button>
      <Container onClick={() => setIsopen(false)}>
        <Map />
        <SendFileFormTest />
      </Container>
    </Box>
  );
}

export default HomeScreen;
