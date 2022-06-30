import { useMapEvents } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { boundsType } from '../../../../types';

interface Props {
  bounds: boundsType;
  isAddLocationActive: boolean;
  setBounds: Function;
  SetCoordinateByClick: Function;
  onOpenLocationForm: Function;
  setCoordinate: Function;
}

export default function MyZoomComponent({
  bounds,
  isAddLocationActive,
  setBounds,
  SetCoordinateByClick,
  onOpenLocationForm,
  setCoordinate
}: Props) {
  const { locationId } = useParams();
  const prev = bounds;

  const map = useMapEvents({
    zoom: () => {
      if (!isAddLocationActive && !locationId) {
        setBounds({ ...prev, ...map.getBounds() });
      }
    },
    dragend: () => {
      if (!isAddLocationActive && !locationId) {
        setBounds({ ...prev, ...map.getBounds() });
      }
    },
    click: e => {
      if (isAddLocationActive) {
        SetCoordinateByClick(e.latlng);
        onOpenLocationForm();
        setCoordinate(e.latlng);
      }
    }
  });
  return null;
}
