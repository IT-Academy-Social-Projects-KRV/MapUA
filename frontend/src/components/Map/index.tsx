import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import { LocationPopOut } from 'components/LocationPopOut/LocationPopOut';
import SearchFormContainer from 'components/SearchFormContainer';
import useDebounce from 'utils/useDebounce';

import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';

interface Props {
  onOpenBigPopup: Function;
}

function Map({ onOpenBigPopup }: Props) {
  const { bounds, locations, zoomPosition, locationName } = useTypedSelector(
    state => state.locationList
  );
  const debouncedValue = useDebounce(locationName, 1000);
  const { setBounds, setZoomPosition, fetchLocations } = useTypedDispatch();
  useEffect(() => {
    fetchLocations(zoomPosition, bounds, debouncedValue);
  }, [bounds, debouncedValue]);
  function MyZoomComponent() {
    const prev = bounds;
    const map = useMapEvents({
      zoom: e => {
        setZoomPosition(e.target.getCenter());
        setBounds({ ...prev, ...map.getBounds() });
      },
      dragend: e => {
        setZoomPosition(e.target.getCenter());
        setBounds({ ...prev, ...map.getBounds() });
      }
    });
    return null;
  }
  return (
    <Box>
      <MapContainer
        center={[50.447731, 30.542721]}
        zoom={6}
        style={{ height: '100vh' }}
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
      </MapContainer>
    </Box>
  );
}

export default Map;
