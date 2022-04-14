import React from 'react'; // , { useEffect, useState } from 'react';
import { StyledMap } from './styles';
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

  return (
    <>
      <div />
      <StyledMap sx={{ mt: 20 }}>Map</StyledMap>
    </>
  );
}

export default Map;
