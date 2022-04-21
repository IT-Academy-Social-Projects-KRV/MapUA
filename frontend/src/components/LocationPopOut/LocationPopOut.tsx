import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { CardMedia, CircularProgress } from '@mui/material';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { fetchData } from 'utils/requests';
import { locationType } from '../../../types';
import { StyledBox, StyledMediaBox, StyledTooltip } from './style';
import icon from '../../static/map-point-svgrepo-com.svg';
import img from '../../static/image-not-found.jpg';

interface Props {
  id: string | undefined;
  coordinates: [number, number];
  onOpenBigPopup: Function;
}

const { REACT_APP_API_URI } = process.env;

export function LocationPopOut({ id, coordinates, onOpenBigPopup }: Props) {
  const [locationData, setLocationData] = useState<locationType>(
    {} as locationType
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onOpenTooltip = async () => {
    if (!locationData.locationName) {
      setIsLoading(true);
      const url = `${REACT_APP_API_URI}locations/${id}`;
      const { data } = await fetchData(url);
      if (data) {
        setLocationData(data);
      }
      setIsLoading(false);
    }
  };

  return (
    <Marker
      icon={L.icon({
        iconUrl: icon,
        iconSize: [30, 30]
      })}
      eventHandlers={{
        click: e => {
          e.originalEvent.stopPropagation();
          onOpenBigPopup(locationData);
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
