import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents
} from 'react-leaflet';
import { v4 } from 'uuid';
import 'leaflet/dist/leaflet.css';
import { locations as locConst, locationType } from '../../constants/develop';
import { fetchData } from '../../fetch/requests';

function Map() {
  const [zoom, setZoom] = useState<number>(6);
  const [locations, setLocations] = useState<locationType[]>(locConst);

  useEffect(() => {
    async function onZoom() {
      // todo fetch new locations onZoom
      const url = `http://localhost:3001/api/locations/search/${zoom}`;
      const { status, data } = await fetchData(url);
      //   positions = JSON.parse(data);
      console.log(status, data);
      // todo rewrite all locations from fetch data
      setLocations(prevLocations => [...prevLocations]);
    }
    onZoom();
  }, [zoom]);

  function MyZoomComponent() {
    const map = useMapEvents({
      zoom: () => {
        setZoom(map.getZoom());
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
    <MapContainer
      center={[50.447731, 30.542721]}
      zoom={zoom}
      style={{ height: '100vh' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((loc: locationType) => (
        <Marker position={loc.coordinates} key={v4()}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      ))}
      <MyZoomComponent />
    </MapContainer>
  );
}

export default Map;
