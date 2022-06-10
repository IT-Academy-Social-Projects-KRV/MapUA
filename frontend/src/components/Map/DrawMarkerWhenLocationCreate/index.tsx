import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { latlngType } from '../../../../types';
import icon from '../../../static/marker.png';

// import shadow from '../../../static/leaf-shadow.png';

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
          iconSize: [40, 40],
          iconAnchor: [30, 38]
        })}
      />
    </div>
  );
}

export default DrawMarkerCreateLocation;
