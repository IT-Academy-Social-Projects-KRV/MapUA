/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
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
import Locations from './Locations/Locations';
import MyZoomComponent from './ZoomComponent';
import { StyledMapContainer } from '../design/StyledMapContainer';
import { StyledAddLocationButton } from '../design/StyledAddLocationButton';

interface Props {
  onOpenBigPopup: Function;
  onOpenLocationForm: Function;
  setCoordinate: Function;
  isOpen: boolean;
  toggleIsAddLocation: Function;
  isAddLocationActive: boolean;
}

function Map({
  onOpenLocationForm,
  setCoordinate,
  isOpen,
  toggleIsAddLocation,
  isAddLocationActive,
  onOpenBigPopup
}: Props) {
  const { t } = useTranslation();
  const { isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized.data
  );
  const {
    bounds,
    locationName: searchName,
    selectedFilters
  } = useTypedSelector(state => state.mapInfo);

  const formRef = useRef<any>(null);
  const [, SetCoordinateByClick] = useState<any>({});
  const debouncedValue = useDebounce(searchName, 1000);
  const { setBounds, fetchLocations } = useTypedDispatch();

  useEffect(() => {
    L.DomEvent.disableClickPropagation(formRef.current);
    L.DomEvent.disableScrollPropagation(formRef.current);
  }, []);

  useEffect(() => {
    fetchLocations(bounds, debouncedValue, selectedFilters);
  }, [bounds, debouncedValue, JSON.stringify(selectedFilters)]);

  return (
    <StyledMapWrapper ref={formRef}>
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
      </StyledMapContainer>
    </StyledMapWrapper>
  );
}

export default Map;
