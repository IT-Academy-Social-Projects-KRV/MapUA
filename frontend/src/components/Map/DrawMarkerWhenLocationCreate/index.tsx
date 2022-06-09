import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { latlngType } from '../../../../types';
import icon from '../../../static/leaf-green.png';

import shadow from '../../../static/leaf-shadow.png';

type Props = {
  coordinate: latlngType;
};
function DrawMarkerCreateLocation({ coordinate }: Props) {
  const { lat, lng } = coordinate;
  return (
    <div>
      <Marker
        position={[lat, lng]}
        icon={L.icon({
          iconUrl: icon,
          shadowUrl: shadow,
          iconSize: [38, 95],
          shadowSize: [50, 64],
          iconAnchor: [30, 94],
          shadowAnchor: [4, 62]
        })}
      />
    </div>
  );
}

export default DrawMarkerCreateLocation;
