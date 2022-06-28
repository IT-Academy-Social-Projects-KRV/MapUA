import React from 'react';
import { LocationPopOut } from 'components/LocationPopOut/LocationPopOut';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';

interface Props {
  onOpenBigPopup: Function;
}

function Locations({ onOpenBigPopup }: Props) {
  const { data: locations } = useTypedSelector(state => state.locationList);
  return (
    <>
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
    </>
  );
}

export default Locations;
