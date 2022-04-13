import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

function Map() {
  function CoordsFinder() {
    useMapEvents({
      click(e) {
        console.log(e.latlng);
      }
    });
    return null;
  }
  return (
    <MapContainer
      center={[50.447731, 30.542721]}
      zoom={9}
      style={{ height: '100vh' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CoordsFinder />
    </MapContainer>
  );
}

export default Map;
