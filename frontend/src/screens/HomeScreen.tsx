import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Map from 'components/Map/index';
import BigPopup from 'components/BigPopup/index';

import { locationType } from '../../types';

function HomeScreen() {
  const [isOpen, setIsopen] = useState(false);
  const [location, setLocation] = useState<locationType | null>(null);

  const onOpenBigPopup = (locationData: locationType) => {
    setLocation(locationData);
    setIsopen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BigPopup
        isOpen={isOpen}
        toggleClose={() => setIsopen(false)}
        location={location}
      />
      <Container sx={{ height: '100%' }} onClick={() => setIsopen(false)}>
        <Map onOpenBigPopup={onOpenBigPopup} />
      </Container>
    </Box>
  );
}

export default HomeScreen;
