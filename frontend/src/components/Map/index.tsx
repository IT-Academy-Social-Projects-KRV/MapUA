/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, memo } from 'react';
import { useParams } from 'react-router-dom';
import { TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';
import SearchFormContainer from 'components/SearchFormContainer';
import useDebounce from 'utils/useDebounce';
import { StyledMapWrapper } from 'components/design/StyledMapWrapper';
import {
  selectIsUserAuthorized,
  selectUserRole
} from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
import {
  selectAuthorizedFilters,
  selectMapInfoBounds,
  selectMapInfoFilters,
  selectMapInfolocationName
} from 'redux/memoizedSelectors/mapInfoSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import L from 'leaflet';
import { Box } from '@mui/material';
import Locations from './Locations/Locations';
import MyZoomComponent from './ZoomComponent';

import { StyledMapContainer } from '../design/StyledMapContainer';
import {
  StyledCloseAddingModeLocationButton,
  StyledAddLocationButton
} from '../design/StyledAddLocationButton';
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
  toggleClose: Function;
  isOpenLocationForm: boolean;
}

function Map({
  onOpenLocationForm,
  setCoordinate,
  isOpen,
  toggleIsAddLocation,
  isAddLocationActive,
  onOpenBigPopup,
  coordinate,
  toggleClose,
  isOpenLocationForm
}: Props) {
  const { t } = useTranslation();

  const isAuthorized = useTypedSelector(selectIsUserAuthorized);
  const role = useTypedSelector(selectUserRole);
  const bounds = useTypedSelector(selectMapInfoBounds);
  const searchName = useTypedSelector(selectMapInfolocationName);
  const selectedFilters = useTypedSelector(selectMapInfoFilters);
  const authorizedFilters = useTypedSelector(selectAuthorizedFilters);

  const { locationId } = useParams();

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

  const closeAddLocationModal = () => {
    toggleClose();
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

        {isAuthorized && !isOpen && role !== 'bannedUser' && (
          <Box ref={closeButtonRef}>
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

            {isAddLocationActive && !isOpenLocationForm && (
              <StyledCloseAddingModeLocationButton
                onClick={closeAddLocationModal}
              >
                x
              </StyledCloseAddingModeLocationButton>
            )}
          </Box>
        )}
        {isOpen && <DrawMarkerCreateLocation coordinate={coordinate} />}
      </StyledMapContainer>
    </StyledMapWrapper>
  );
}

export default memo(Map);
