/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';
import SearchFormContainer from 'components/SearchFormContainer';
import useDebounce from 'utils/useDebounce';
import { v4 } from 'uuid';
import { StyledMapWrapper } from 'components/design/StyledMapWrapper';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import L from 'leaflet';
import { Button } from '@mui/material';
import Locations from './Locations/Locations';
import MyZoomComponent from './ZoomComponent';

import { StyledMapContainer } from '../design/StyledMapContainer';
import { StyledAddLocationButton } from '../design/StyledAddLocationButton';
import { latlngType } from '../../../types';
import DrawMarkerCreateLocation from './DrawMarkerWhenLocationCreate';

interface Props {
  onOpenBigPopup: Function;
  onOpenLocationForm: Function;
  setCoordinate: Function;
  isOpen: boolean;
  toggleIsAddLocation: Function;
  isAddLocationActive: boolean;
  coordinate: latlngType;
  toggleClose: any;
}

function Map({
  onOpenLocationForm,
  setCoordinate,
  isOpen,
  toggleIsAddLocation,
  isAddLocationActive,
  onOpenBigPopup,
  coordinate,
  toggleClose
}: Props) {
  const { t } = useTranslation();
  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
  );

  const { locationId } = useParams();

  const { setLocationName } = useTypedDispatch();

  const {
    bounds,
    locationName: searchName,
    selectedFilters,
    authorizedFilters
  } = useTypedSelector(state => state.mapInfo);

  const closeButtonRef = React.useRef<any>(null);

  const [, SetCoordinateByClick] = useState<any>({});
  const debouncedValue = useDebounce(searchName, 1000);
  const { setBounds, fetchLocations } = useTypedDispatch();

  useEffect(() => {
    if (closeButtonRef.current)
      L.DomEvent.disableClickPropagation(closeButtonRef.current);
  }, [isAddLocationActive]);

  useEffect(() => {
    fetchLocations(bounds, debouncedValue, selectedFilters, authorizedFilters);
  }, [
    bounds,
    debouncedValue,
    JSON.stringify(selectedFilters),
    JSON.stringify(authorizedFilters),
    locationId
  ]);

  const closeAddLocationModal = (e: any) => {
    toggleClose();
    SetCoordinateByClick('');
  };

  return (
    <StyledMapWrapper>
      <StyledMapContainer
        center={[48.978189, 31.982826]}
        zoom={6}
        minZoom={4}
        maxZoom={16}
        worldCopyJump
      >
        <TileLayer url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png" />

        <MyZoomComponent
          bounds={bounds}
          isAddLocationActive={isAddLocationActive}
          setBounds={setBounds}
          SetCoordinateByClick={SetCoordinateByClick}
          onOpenLocationForm={onOpenLocationForm}
          setCoordinate={setCoordinate}
        />

        <Locations onOpenBigPopup={onOpenBigPopup} />

        <SearchFormContainer />

        {isAuthorized && !isOpen && (
          <StyledAddLocationButton
            onClick={() => toggleIsAddLocation()}
            style={{
              background: isAddLocationActive ? 'yellow' : 'white',
              color: isAddLocationActive ? 'black' : '#1976d2'
            }}
          >
            {isAddLocationActive
              ? `${t('map.chooseCoordinates')}`
              : `${t('map.addLocation')}`}
          </StyledAddLocationButton>
        )}

        {isAddLocationActive && (
          <Button
            ref={closeButtonRef}
            style={{
              zIndex: 15000,
              position: 'absolute',
              top: '15px',
              left: '230px',
              padding: '8px',
              backgroundColor: 'yellow',
              height: '35px',
              minWidth: '35px',
              color: 'black'
            }}
            onClick={closeAddLocationModal}
            // onClick={() => {
            //   console.log('clicked');
            // }}
          >
            x
          </Button>
        )}
        {isOpen && <DrawMarkerCreateLocation coordinate={coordinate} />}
      </StyledMapContainer>
    </StyledMapWrapper>
  );
}

export default Map;
