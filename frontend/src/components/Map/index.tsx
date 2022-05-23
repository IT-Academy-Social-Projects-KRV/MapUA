/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button } from '@mui/material';
import { LocationPopOut } from 'components/LocationPopOut/LocationPopOut';
import SearchFormContainer from 'components/SearchFormContainer';
import useDebounce from 'utils/useDebounce';

import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import L from 'leaflet';

interface Props {
  onOpenBigPopup: Function;
  onOpenLocationForm: Function;
  isAuth: boolean;
  setCoordinate: Function;
  isOpen: boolean;
}

function Map({
  onOpenBigPopup,
  onOpenLocationForm,
  isAuth,
  setCoordinate,
  isOpen
}: Props) {
  const formRef = React.useRef<any>(null);
  const [coordinateByClick, SetCoordinateByClick] = useState<any>({});
  const [isAddLocationActive, setIsAddLocationActive] = useState(false);

  const { bounds, locations, zoomPosition, locationName, selectedFilters } =
    useTypedSelector(state => state.locationList);
  const debouncedValue = useDebounce(locationName, 1000);
  const { setBounds, setZoomPosition, fetchLocations } = useTypedDispatch();
  useEffect(() => {
    fetchLocations(zoomPosition, bounds, debouncedValue, selectedFilters);
  }, [bounds, debouncedValue, JSON.stringify(selectedFilters)]);

  useEffect(() => {
    L.DomEvent.disableClickPropagation(formRef.current);
    L.DomEvent.disableScrollPropagation(formRef.current);
  }, []);

  function MyZoomComponent() {
    const prev = bounds;
    const map = useMapEvents({
      zoom: e => {
        if (!isAddLocationActive) {
          setZoomPosition(e.target.getCenter());
          setBounds({ ...prev, ...map.getBounds() });
        }
      },
      dragend: e => {
        if (!isAddLocationActive) {
          setZoomPosition(e.target.getCenter());
          setBounds({ ...prev, ...map.getBounds() });
        }
      },
      click: e => {
        if (isAddLocationActive) {
          SetCoordinateByClick(e.latlng);
          onOpenLocationForm();
          setCoordinate(e.latlng);
        }
      }
    });
    return null;
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }} ref={formRef}>
      <MapContainer
        center={[48.978189, 31.982826]}
        zoom={6}
        style={{ height: '100%', width: '100vw' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png" />

        <MyZoomComponent />
        {locations.map(({ _id, coordinates }) => (
          <LocationPopOut
            key={_id}
            id={_id}
            coordinates={coordinates}
            onOpenBigPopup={onOpenBigPopup}
          />
        ))}
        <SearchFormContainer />
        {!isOpen && (
          <Button
            onClick={e => {
              console.log('onclick');
              e.stopPropagation();
              setIsAddLocationActive(prevState => !prevState);
            }}
            style={{
              background: isAddLocationActive ? 'red' : 'white',
              color: isAddLocationActive ? 'white' : '#1976d2',
              zIndex: '10000',
              position: 'absolute',
              top: '15px',
              left: '50px',
              padding: '8px'
            }}
          >
            {isAddLocationActive ? 'Cancel' : 'Add location'}
          </Button>
        )}
      </MapContainer>
    </Box>
  );
}

export default Map;
