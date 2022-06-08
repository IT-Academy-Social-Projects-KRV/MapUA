import React from 'react';
import { Marker } from 'react-leaflet';
import { latlngType } from '../../../../types';

type Props = {
  coordinate: latlngType;
};
function DrawMarkerCreateLocation({ coordinate }: Props) {
  const { lat, lng } = coordinate;
  return (
    <div>
      <Marker position={[lat, lng]} />
    </div>
  );
}

export default DrawMarkerCreateLocation;
