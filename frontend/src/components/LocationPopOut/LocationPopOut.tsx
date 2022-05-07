import * as React from 'react';

import Typography from '@mui/material/Typography';
import { CardMedia, CircularProgress } from '@mui/material';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { StyledBox, StyledMediaBox, StyledTooltip } from './style';
import icon from '../../static/map-point-svgrepo-com.svg';
import img from '../../static/image-not-found.jpg';

interface Props {
  id: string;
  coordinates: [number, number];
  onOpenBigPopup: Function;
}

export function LocationPopOut({ id, coordinates, onOpenBigPopup }: Props) {
  const locationData = useTypedSelector(state => state.popupLocation);
  const { isLoading } = locationData;
  const { fetchPopupLocation, startLoading } = useTypedDispatch();

  const onOpenTooltip = () => {
    startLoading();
    fetchPopupLocation(id);
  };

  return (
    <Marker
      icon={L.icon({
        iconUrl: icon,
        iconSize: [30, 30]
      })}
      eventHandlers={{
        click: e => {
          if (!isLoading) {
            e.originalEvent.stopPropagation();
            onOpenBigPopup(locationData);
          }
        },
        tooltipopen: () => onOpenTooltip()
      }}
      position={coordinates}
    >
      <StyledTooltip>
        <StyledBox>
          <StyledMediaBox>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <CardMedia
                sx={{ borderRadius: '20px' }}
                src={!locationData.photoSrc ? img : locationData.photoSrc}
                component="img"
                alt={locationData.locationName}
              />
            )}
          </StyledMediaBox>
          <Typography
            variant="h6"
            sx={{ padding: 5 }}
            textAlign="center"
            color="inherit"
          >
            {locationData.locationName}
          </Typography>
        </StyledBox>
      </StyledTooltip>
    </Marker>
  );
}
