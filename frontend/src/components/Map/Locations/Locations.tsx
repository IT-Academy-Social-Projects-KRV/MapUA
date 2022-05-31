import React from 'react';
import { LocationPopOut } from 'components/LocationPopOut/LocationPopOut';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';

interface Props {
  onOpenBigPopup: Function;
}

function Locations({ onOpenBigPopup }: Props) {
  const { locations } = useTypedSelector(state => state.locationList);
  return (
    <>
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
    </>
  );
}

export default Locations;
