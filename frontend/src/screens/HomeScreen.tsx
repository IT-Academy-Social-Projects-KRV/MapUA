/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Map from 'components/Map/index';
import BigPopup from 'components/BigPopup/index';

import BigPopupLocation from 'components/design/BigPopupLocation';
import CreateLocation from 'components/CreateLocation/CreateLocation';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { locationType } from '../../types';

function HomeScreen() {
  const [isAuth] = useState(true);
  const [isOpenLocationPopup, setIsOpenLocationPopup] = useState(false);
  const [isOpenLocacionForm, setIsOpenLocacionForm] = useState(false);

  const [location, setLocation] = useState<locationType | null>(null);
  const [coordinate, setCoordinate] = useState<any>([]);

  const { isAuthorized } = useTypedSelector(state => state.userAuth);
  const { fetchUser } = useTypedDispatch();

  const onOpenBigPopup = (locationData: locationType) => {
    setLocation(locationData);
    setIsOpenLocationPopup(true);
  };

  const onOpenLocationForm = () => {
    setIsOpenLocacionForm(true);
  };

  useEffect(() => {
    if (isAuthorized) {
      const accessToken = localStorage.getItem('accessToken');
      // @ts-ignore
      fetchUser(accessToken);
    }
  }, [isAuthorized]);

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
        <CreateLocation coordinate={coordinate} />
      </BigPopupLocation>
      <Box
        sx={{ height: '100%' }}
        onClick={() => setIsOpenLocationPopup(false)}
      >
        <Map
          onOpenBigPopup={onOpenBigPopup}
          onOpenLocationForm={onOpenLocationForm}
          isAuth={isAuth}
          setCoordinate={setCoordinate}
          isOpen={isOpenLocacionForm}
        />
      </Box>
    </Box>
  );
}

export default HomeScreen;
