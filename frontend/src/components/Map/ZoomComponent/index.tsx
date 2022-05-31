import { useMapEvents } from 'react-leaflet';

interface Props {
  bounds: any;
  isAddLocationActive: boolean;
  setZoomPosition: Function;
  setBounds: Function;
  SetCoordinateByClick: Function;
  onOpenLocationForm: Function;
  setCoordinate: Function;
}

export default function MyZoomComponent({
  bounds,
  isAddLocationActive,
  setZoomPosition,
  setBounds,
  SetCoordinateByClick,
  onOpenLocationForm,
  setCoordinate
}: Props) {
  const prev = bounds;
  const map = useMapEvents({
    zoom: e => {
      if (!isAddLocationActive) {
        setZoomPosition(e.target.getCenter());
        setBounds({ ...prev, ...map.getBounds() });
      }
    },
    dragend: e => {
      if (!isAddLocationActive) {
        setZoomPosition(e.target.getCenter());
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
