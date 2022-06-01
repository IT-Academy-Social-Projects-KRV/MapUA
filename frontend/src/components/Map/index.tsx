/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SearchFormContainer from 'components/SearchFormContainer';
import useDebounce from 'utils/useDebounce';
import { v4 } from 'uuid';

import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import L from 'leaflet';
import Locations from './Locations/Locations';
import MyZoomComponent from './ZoomComponent';

interface Props {
  onOpenBigPopup: Function;
  onOpenLocationForm: Function;
  setCoordinate: Function;
  isOpen: boolean;
  showAddLocationButton: boolean;
  setIsAddLocationActive: Function;
  isAddLocationActive: boolean;
}

function Map({
  onOpenLocationForm,
  setCoordinate,
  isOpen,
  showAddLocationButton,
  setIsAddLocationActive,
  isAddLocationActive,
  onOpenBigPopup
}: Props) {
  const { t } = useTranslation();
  const { data: isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized
  );
  const {
    bounds,
    locationName: searchName,
    selectedFilters
  } = useTypedSelector(state => state.mapInfo);

  const formRef = React.useRef<any>(null);
  const [, SetCoordinateByClick] = useState<any>({});
  const debouncedValue = useDebounce(searchName, 1000);
  const { setBounds, fetchLocations } = useTypedDispatch();

  useEffect(() => {
    L.DomEvent.disableClickPropagation(formRef.current);
    L.DomEvent.disableScrollPropagation(formRef.current);
  }, []);
  useEffect(() => {
    fetchLocations(bounds, debouncedValue, selectedFilters);
  }, [bounds, debouncedValue, JSON.stringify(selectedFilters)]);

  return (
    <Box sx={{ height: '100%', width: '100%' }} ref={formRef}>
      <MapContainer
        center={[48.978189, 31.982826]}
        zoom={6}
        minZoom={4}
        maxZoom={16}
        worldCopyJump
        style={{ height: '100%', width: '100vw' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png" />

        <MyZoomComponent
          bounds={bounds}
          isAddLocationActive={isAddLocationActive}
          setBounds={setBounds}
          SetCoordinateByClick={SetCoordinateByClick}
          onOpenLocationForm={onOpenLocationForm}
          setCoordinate={setCoordinate}
        />

        <Locations onOpenBigPopup={onOpenBigPopup} />

        <SearchFormContainer />

        {isAuthorized && showAddLocationButton && !isOpen && (
          <Button
            onClick={() =>
              setIsAddLocationActive((prevState: boolean) => !prevState)
            }
            style={{
              background: isAddLocationActive ? 'yellow' : 'white',
              color: isAddLocationActive ? 'black' : '#1976d2',
              zIndex: '10000',
              position: 'absolute',
              top: '15px',
              left: '50px',
              padding: '8px'
            }}
          >
            {isAddLocationActive
              ? `${t('map.chooseCoordinates')}`
              : `${t('map.addLocation')}`}
          </Button>
        )}
      </MapContainer>
    </Box>
  );
}

export default Map;
