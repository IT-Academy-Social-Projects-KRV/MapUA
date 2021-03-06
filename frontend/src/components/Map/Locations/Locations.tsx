import React from 'react';
import { LocationPopOut } from 'components/LocationPopOut/LocationPopOut';
import { selectLocationList } from 'redux/memoizedSelectors/locationListSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import MarkerClusterGroup from '../../MarkerClusterGroup/MarkerClusterGroup';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';

interface Props {
  onOpenBigPopup: Function;
}

function Locations({ onOpenBigPopup }: Props) {
  const locations = useTypedSelector(selectLocationList);

  return (
    <MarkerClusterGroup>
      {locations.map(
        ({
          _id,
          coordinates,
          locationName,
          arrayPhotos,
          verificationStatus
        }) => (
          <LocationPopOut
            key={_id}
            id={_id}
            coordinates={coordinates}
            locationName={locationName}
            arrayPhotos={arrayPhotos}
            onOpenBigPopup={onOpenBigPopup}
            verificationStatus={verificationStatus}
          />
        )
      )}
    </MarkerClusterGroup>
  );
}

export default Locations;
