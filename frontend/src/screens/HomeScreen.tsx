/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Map from 'components/Map/index';
import BigPopup from 'components/BigPopup/index';
import BigPopupLocation from 'components/design/BigPopupLocation';
import CreateLocation from 'components/CreateLocation/CreateLocation';
import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { locationType } from '../../types';

function HomeScreen() {
  const [isAddLocationActive, setIsAddLocationActive] = useState(false);
  const [isOpenLocationPopup, setIsOpenLocationPopup] = useState(false);
  const [isOpenLocationForm, setIsOpenLocationForm] = useState(false);
  const [location, setLocation] = useState<locationType | null>(null);
  const [coordinate, setCoordinate] = useState<any>([]);
  const [, setSearchParams] = useSearchParams();
  const { setLocationName } = useTypedDispatch();

  const onOpenBigPopup = (locationData: locationType) => {
    setLocation(locationData);
    setIsOpenLocationPopup(true);
  };

  const onOpenLocationForm = () => {
    setIsOpenLocationForm(true);
  };

  const toggleIsAddLocation = () => {
    setIsAddLocationActive(prevState => !prevState);
  };

  const setIsAddLocation = (value: boolean) => {
    setIsAddLocationActive(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BigPopup
        isOpen={isOpenLocationPopup}
        toggleClose={() => {
          setIsOpenLocationPopup(false);
          setSearchParams({});
          setLocationName('');
        }}
        location={location}
      />

      <BigPopupLocation
        isOpen={isOpenLocationForm}
        toggleClose={() => setIsOpenLocationForm(false)}
        setIsAddLocation={setIsAddLocation}
      >
        <CreateLocation
          coordinate={coordinate}
          closeBigPopup={() => setIsOpenLocationForm(false)}
          setIsAddLocation={setIsAddLocation}
        />
      </BigPopupLocation>
      <Box
        sx={{ height: '100%' }}
        onClick={() => setIsOpenLocationPopup(false)}
      >
        <Map
          onOpenBigPopup={onOpenBigPopup}
          onOpenLocationForm={onOpenLocationForm}
          setCoordinate={setCoordinate}
          isOpen={isOpenLocationForm}
          toggleIsAddLocation={toggleIsAddLocation}
          isAddLocationActive={isAddLocationActive}
          coordinate={coordinate}
          toggleClose={() => {
            setIsOpenLocationPopup(false);
            setIsAddLocationActive(false);
            setIsAddLocation(false);
            setSearchParams({});
            setLocationName('');
          }}
        />
      </Box>
    </Box>
  );
}

export default HomeScreen;
