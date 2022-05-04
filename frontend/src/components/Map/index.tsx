import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Box } from '@mui/material';
import SearchFormContainer from 'components/SearchFormContainer';

function Map() {
  return (
    <Box>
      <MapContainer
        center={[50.447731, 30.542721]}
        zoom={9}
        style={{ height: '100vh' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SearchFormContainer />
      </MapContainer>
    </Box>
  );
}

export default Map;
