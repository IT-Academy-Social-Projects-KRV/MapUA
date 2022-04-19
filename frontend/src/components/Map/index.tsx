import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { boundsType, latlngType, lightLocationType } from '../../../types';
import { fetchData } from '../../utils/requests';

function Map() {
  const [bounds, setBounds] = useState<boundsType>({
    _northEast: { lat: 54.82600799909498, lng: 38.64990234375001 },
    _southWest: { lat: 45.62940492064501, lng: 22.456054687500004 }
  });
  const [center, setCenter] = useState<[number, number]>([
    50.447731, 30.542721
  ]);
  const [zoom, setZoom] = useState<number>(6);
  const [zoomPosition, setZoomPosition] = useState<latlngType>({
    lat: 50.447731,
    lng: 30.542721
  });
  // eslint-disable-next-line no-unused-vars
  const [locations, setLocations] = useState<lightLocationType[]>([]);

  useEffect(() => {
    async function onZoom() {
      const url = `http://localhost:3001/api/locations/location-list`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          zoom,
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
    onZoom();
  }, [bounds]);

  function MyZoomComponent() {
    const map = useMapEvents({
      zoom: e => {
        setZoom(map.getZoom());
        // eslint-disable-next-line no-underscore-dangle
        // setZoomPosition(e.target._animateToCenter);
        setZoomPosition(e.target.getCenter());
        setBounds((prev: boundsType) => ({
          ...prev,
          ...map.getBounds()
        }));
        setCenter(prev => ({
          ...prev,
          ...map.getCenter()
        }));
      },
      click: () => null,
      dragend: e => {
        // eslint-disable-next-line no-underscore-dangle
        // setZoomPosition(e.target._animateToCenter);
        setZoomPosition(e.target.getCenter());
        setBounds((prev: boundsType) => ({
          ...prev,
          ...map.getBounds()
        }));
        setCenter(prev => ({
          ...prev,
          ...map.getCenter()
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
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MyZoomComponent />
    </MapContainer>
  );
}

export default Map;
