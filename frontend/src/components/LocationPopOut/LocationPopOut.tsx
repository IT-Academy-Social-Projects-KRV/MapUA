import * as React from 'react';
import L from 'leaflet';
import { CardMedia, Typography } from '@mui/material';
import { Marker } from 'react-leaflet';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import {
  StyledBox,
  StyledMediaBox,
  StyledTooltip
} from '../design/StyledLocationPopOut';
import icon from '../../static/map-point-svgrepo-com.svg';
import img from '../../static/image-not-found.jpg';

interface Props {
  id: string;
  coordinates: [number, number];
  locationName: string;
  arrayPhotos: string[];
  onOpenBigPopup: Function;
}

export function LocationPopOut({
  id,
  coordinates,
  locationName,
  arrayPhotos,
  onOpenBigPopup
}: Props) {
  const locationData = useTypedSelector(state => state.popupLocation);
  const { loading } = locationData;
  const { fetchPopupLocation } = useTypedDispatch();

  return (
    <Marker
      icon={L.icon({
        iconUrl: icon,
        iconSize: [30, 30]
      })}
      eventHandlers={{
        click: e => {
          if (!loading) {
            e.originalEvent.stopPropagation();
            fetchPopupLocation(id);
            onOpenBigPopup(locationData);
          }
        }
      }}
      position={coordinates}
    >
      <StyledTooltip>
        <StyledBox>
          <StyledMediaBox>
            <CardMedia
              sx={{ borderRadius: '20px', height: '100%' }}
              src={!arrayPhotos[0] ? img : arrayPhotos[0]}
              component="img"
              alt={locationName}
            />
          </StyledMediaBox>
          <Typography
            variant="h6"
            sx={{ padding: 5 }}
            textAlign="center"
            color="inherit"
          >
            {locationName}
          </Typography>
        </StyledBox>
      </StyledTooltip>
    </Marker>
  );
}
