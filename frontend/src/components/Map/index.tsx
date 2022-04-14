import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

function Map() {
  // Function that defines coordinates on mouse click
  // function CoordsFinder() {
  //   useMapEvents({
  //     click(e) {
  //       console.log(e.latlng);
  //     }
  //   });
  //   return null;
  // }
  return (
    <MapContainer
      center={[50.447731, 30.542721]}
      zoom={9}
      style={{ height: '100vh' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}

export default Map;
