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
import { lightLocationType } from '../../constants/develop';
import { fetchData } from '../../fetch/requests';

type latlngType = {
  lat: number;
  lng: number;
};

type boundsType = {
  _northEast: {
    lat: number;
    lng: number;
  };
  _southWest: {
    lat: number;
    lng: number;
  };
};

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
  const [locations, setLocations] = useState<lightLocationType[]>([]);

  useEffect(() => {
    async function onZoom() {
      const url = `http://localhost:3001/api/locations/search/${zoom}/${JSON.stringify(
        zoomPosition
      )}/${JSON.stringify(bounds)}`;
      const { status, data } = await fetchData(url);

      if (data.mes) {
        console.log(data.mes);
        return;
      }

      if (data.locations && typeof data.locations === typeof []) {
        console.log(status, data.locations);
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
        setBounds(prev => ({
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
        setBounds(prev => ({
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
      {locations.map((loc: lightLocationType) => (
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
