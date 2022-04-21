import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import { LocationPopOut } from 'components/LocationPopOut/LocationPopOut';
import { boundsType, latlngType, lightLocationType } from '../../../types';
import { fetchData } from '../../utils/requests';

const { REACT_APP_API_URI } = process.env;

interface Props {
  onOpenBigPopup: Function;
}

function Map({ onOpenBigPopup }: Props) {
  const [bounds, setBounds] = useState<boundsType>({
    _northEast: { lat: 54.82600799909498, lng: 38.64990234375001 },
    _southWest: { lat: 45.62940492064501, lng: 22.456054687500004 }
  });
  const [zoomPosition, setZoomPosition] = useState<latlngType>({
    lat: 50.447731,
    lng: 30.542721
  });
  // eslint-disable-next-line no-unused-vars
  const [locations, setLocations] = useState<lightLocationType[]>([]);

  useEffect(() => {
    async function onBoundsChange() {
      const url = `${REACT_APP_API_URI}locations/location-list`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          center: JSON.stringify(zoomPosition),
          bounds: JSON.stringify(bounds)
        })
      };
      const { status, data } = await fetchData(url, options);

      if (data && data.mes && status) {
        console.log(data.mes, status);
        return;
      }

      if (data && data.locations && typeof data.locations === typeof []) {
        setLocations(() => [...data.locations]);
      }
    }
    onBoundsChange();
  }, [bounds]);

  function MyZoomComponent() {
    const map = useMapEvents({
      zoom: e => {
        setZoomPosition(e.target.getCenter());
        setBounds((prev: boundsType) => ({
          ...prev,
          ...map.getBounds()
        }));
      },
      dragend: e => {
        setZoomPosition(e.target.getCenter());
        setBounds((prev: boundsType) => ({
          ...prev,
          ...map.getBounds()
        }));
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
