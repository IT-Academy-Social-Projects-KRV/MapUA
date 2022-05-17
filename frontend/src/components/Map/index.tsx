/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  useMapEvents
  // Marker,
  // Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button } from '@mui/material';
import { LocationPopOut } from 'components/LocationPopOut/LocationPopOut';
import SearchFormContainer from 'components/SearchFormContainer';
import useDebounce from 'utils/useDebounce';

import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import L from 'leaflet';
import BigPopup from 'components/BigPopup';

interface Props {
  onOpenBigPopup: Function;
}

// function LocationMarker() {
//   const [position, setPosition] = useState(null);
//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       // @ts-ignore
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     }
//   });

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }

function Map({ onOpenBigPopup }: Props) {
  const locationData = useTypedSelector(state => state.popupLocation);
  console.log(locationData, 'locationData');

  const { isLoading } = locationData;
  const formRef = React.useRef<any>(null);
  const [coordinateByClick, SetCoordinateByClick] = useState<any>({});
  const [showPopup, setShowPopup] = useState(null);
  const [pressedButton, setPressedButton] = useState(false);

  const { bounds, locations, zoomPosition, locationName, selectedFilters } =
    useTypedSelector(state => state.locationList);
  const debouncedValue = useDebounce(locationName, 1000);
  const { setBounds, setZoomPosition, fetchLocations } = useTypedDispatch();
  useEffect(() => {
    fetchLocations(zoomPosition, bounds, debouncedValue, selectedFilters);
  }, [bounds, debouncedValue, JSON.stringify(selectedFilters)]);

  useEffect(() => {
    L.DomEvent.disableClickPropagation(formRef.current);
    L.DomEvent.disableScrollPropagation(formRef.current);
  }, []);

  function MyZoomComponent() {
    const prev = bounds;
    const map = useMapEvents({
      zoom: e => {
        if (!pressedButton) {
          setZoomPosition(e.target.getCenter());
          setBounds({ ...prev, ...map.getBounds() });
        }
      },
      dragend: e => {
        if (!pressedButton) {
          setZoomPosition(e.target.getCenter());
          setBounds({ ...prev, ...map.getBounds() });
        }
      },
      click: e => {
        if (pressedButton) {
          SetCoordinateByClick(e.latlng);
        }
      }
    });
    return null;
  }

  console.log(coordinateByClick);

  return (
    <Box sx={{ height: '100%', width: '100%' }} ref={formRef}>
      <MapContainer
        center={[48.978189, 31.982826]}
        zoom={6}
        style={{ height: '100%', width: '100vw' }}
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
        <SearchFormContainer />

        <Button
          onClick={() => {
            setPressedButton(true);
            console.log(onOpenBigPopup(locationData));
          }}
          style={{
            background: 'white',
            zIndex: '10000',
            position: 'absolute',
            top: '15px',
            left: '50px',
            padding: '8px'
          }}
        >
          Add location
        </Button>
        {/* <LocationMarker /> */}
        {/* {pressedButton } */}
      </MapContainer>
    </Box>
  );
}

export default Map;
