import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
// import React, { useEffect, useState } from 'react';
// import { StyledMap } from './styles';
// import { fetchData } from '../../fetch/requests';

// type coordinatesType = {
//   x: number;
//   y: number;
// };
// import { fetchData } from '../../fetch/requests';

// type coordinatesType = {
//   x: number;
//   y: number;
// };
function Map() {
  // const [zoom, setZoom] = useState<number>();
  // const [coordinates, setСoordinates] = useState<coordinatesType>();
  // // @ts-ignore
  // useEffect(async () => {
  //   const url = 'http://localhost/locations';
  //   const options = { zoom, coordinates };
  //   const { status, data } = await fetchData(url, options);
  //   console.log(status, data);
  // }, [zoom, coordinates]);
  //
  // function onZoomIn(e: any) {
  //   e.preventDefault();
  //   setZoom(1);
  //   setСoordinates({ x: 1, y: 1 });
  // }
  //
  // function onZoomOut(e: any) {
  //   e.preventDefault();
  //   setZoom(1);
  //   setСoordinates({ x: 1, y: 1 });
  // }
  //
  // function onMapDrag(e: any) {
  //   e.preventDefault();
  //   setZoom(1);
  //   setСoordinates({ x: 1, y: 1 });
  // }
  // TODO
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
