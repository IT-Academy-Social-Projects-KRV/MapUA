import React, { useState } from 'react';
import { Box } from '@mui/material';
import Map from 'components/Map/index';
import BigPopup from 'components/BigPopup/index';

import BigPopupLocation from 'components/design/BigPopupLocation';
import { locationType } from '../../types';

function HomeScreen() {
  const [isOpenLocationPopup, setIsOpenLocationPopup] = useState(false);
  const [isOpenLocacionForm, setIsOpenLocacionForm] = useState(false);

  const [location, setLocation] = useState<locationType | null>(null);

  const onOpenBigPopup = (locationData: locationType) => {
    setLocation(locationData);
    setIsOpenLocationPopup(true);
  };

  const onOpenLocationForm = () => {
    setIsOpenLocacionForm(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BigPopup
        isOpen={isOpenLocationPopup}
        toggleClose={() => setIsOpenLocationPopup(false)}
        location={location}
      />
      <BigPopupLocation
        isOpen={isOpenLocacionForm}
        toggleClose={() => setIsOpenLocacionForm(false)}
      >
        <Box
          sx={{ width: '300px', height: '600px', backgroundColor: 'tomato' }}
        />
      </BigPopupLocation>
      <Box
        sx={{ height: '100%' }}
        onClick={() => setIsOpenLocationPopup(false)}
      >
        <Map
          onOpenBigPopup={onOpenBigPopup}
          onOpenLocationForm={onOpenLocationForm}
        />
      </Box>
    </Box>
  );
}

export default HomeScreen;
