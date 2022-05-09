import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import { LocationPopOut } from 'components/LocationPopOut/LocationPopOut';

import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';

interface Props {
  onOpenBigPopup: Function;
}

function Map({ onOpenBigPopup }: Props) {
  const { bounds, locations, zoomPosition } = useTypedSelector(
    state => state.locationList
  );
  const { fetchLocations, setBounds, setZoomPosition } = useTypedDispatch();
  useEffect(() => {
    fetchLocations(zoomPosition, bounds);
  }, [bounds]);

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
  // TODO Function that defines coordinates on mouse click
  // function CoordsFinder() {
  //   useMapEvents({
  //     click(e) {
  //       console.log(e.latlng);
  //     }
  //   });
  //   return null;
  // }

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
      </MapContainer>
    </Box>
  );
}

export default Map;
