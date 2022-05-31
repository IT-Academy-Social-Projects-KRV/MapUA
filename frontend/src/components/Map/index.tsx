/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LocationPopOut } from 'components/LocationPopOut/LocationPopOut';
import SearchFormContainer from 'components/SearchFormContainer';
import useDebounce from 'utils/useDebounce';

import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import L from 'leaflet';

interface Props {
  onOpenBigPopup: Function;
  onOpenLocationForm: Function;
  setCoordinate: Function;
  isOpen: boolean;
  showAddLocationButton: boolean;
  setIsAddLocationActive: Function;
  isAddLocationActive: boolean;
}

function Map({
  onOpenBigPopup,
  onOpenLocationForm,
  setCoordinate,
  isOpen,
  showAddLocationButton,
  setIsAddLocationActive,
  isAddLocationActive
}: Props) {
  const { t } = useTranslation();
  const userAuth = useTypedSelector(state => state.userAuth.isAuthorized);

  const formRef = React.useRef<any>(null);
  const [coordinateByClick, SetCoordinateByClick] = useState<any>({});
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
        if (!isAddLocationActive) {
          setZoomPosition(e.target.getCenter());
          setBounds({ ...prev, ...map.getBounds() });
        }
      },
      dragend: e => {
        if (!isAddLocationActive) {
          setZoomPosition(e.target.getCenter());
          setBounds({ ...prev, ...map.getBounds() });
        }
      },
      click: e => {
        if (isAddLocationActive) {
          SetCoordinateByClick(e.latlng);
          onOpenLocationForm();
          setCoordinate(e.latlng);
        }
      }
    });
    return null;
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }} ref={formRef}>
      <MapContainer
        center={[48.978189, 31.982826]}
        zoom={6}
        minZoom={4}
        maxZoom={16}
        worldCopyJump
        style={{ height: '100%', width: '100vw' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png" />

        <MyZoomComponent />
        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
        {locations.map(({ _id, coordinates, locationName, arrayPhotos }) => (
          <LocationPopOut
            key={_id}
            id={_id}
            coordinates={coordinates}
            locationName={locationName}
            arrayPhotos={arrayPhotos}
            onOpenBigPopup={onOpenBigPopup}
          />
        ))}
        <SearchFormContainer />
        {userAuth && showAddLocationButton && !isOpen && (
          <Button
            onClick={() =>
              setIsAddLocationActive((prevState: boolean) => !prevState)
            }
            style={{
              background: isAddLocationActive ? 'yellow' : 'white',
              color: isAddLocationActive ? 'black' : '#1976d2',
              zIndex: '10000',
              position: 'absolute',
              top: '15px',
              left: '50px',
              padding: '8px'
            }}
          >
            {isAddLocationActive
              ? `${t('map.chooseCoordinates')}`
              : `${t('map.addLocation')}`}
          </Button>
        )}
      </MapContainer>
    </Box>
  );
}

export default Map;
