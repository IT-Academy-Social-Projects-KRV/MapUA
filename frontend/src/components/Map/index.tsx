/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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
  showAddLocationButton: boolean;
  setIsAddLocationActive: Function;
  isAddLocationActive: boolean;
}

function Map({
  onOpenLocationForm,
  setCoordinate,
  isOpen,
  showAddLocationButton,
  setIsAddLocationActive,
  isAddLocationActive,
  onOpenBigPopup
}: Props) {
  const { t } = useTranslation();
  const { data: isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized
  );
  const {
    bounds,
    locationName: searchName,
    selectedFilters
  } = useTypedSelector(state => state.mapInfo);
  console.log('selectedFilters', selectedFilters);

  const { favorite, visited, personalLocations } = useTypedSelector(
    state => state.userData.data
  );
  let authorizedFilters: any[] = ['aaa'];
  useEffect(() => {
    if (selectedFilters.includes('favorites')) {
      authorizedFilters = [...authorizedFilters, ...favorite];
    }
    if (selectedFilters.includes('visited')) {
      authorizedFilters = [...authorizedFilters, ...visited];
    }
    if (selectedFilters.includes('personalLocations')) {
      authorizedFilters = [...personalLocations];
    }
    console.log('authorizedFilters', authorizedFilters);
  }, [selectedFilters]);

  // const authorizedFilters = [...favorite, ...visited, ...personalLocations];
  // console.log('authorizedFilters', authorizedFilters);

  const formRef = React.useRef<any>(null);
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
            onClick={() =>
              setIsAddLocationActive((prevState: boolean) => !prevState)
            }
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
