import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { CardMedia, CircularProgress } from '@mui/material';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { fetchData } from 'utils/requests';
import { LocationPopOutData } from '../../../types';
import { StyledBox, StyledMediaBox, StyledTooltip } from './style';
import icon from '../../static/map-point-svgrepo-com.svg';
import img from '../../static/image-not-found.jpg';

interface Props {
  id: string | undefined;
  coordinates: [number, number];
}

const { REACT_APP_API_URI } = process.env;

export function LocationPopOut({ id, coordinates }: Props) {
  const [locationData, setLocationData] = useState<LocationPopOutData>(
    {} as LocationPopOutData
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onOpenTooltip = async () => {
    if (!locationData.locationName) {
      setIsLoading(true);
      const url = `${REACT_APP_API_URI}locations/${id}`;
      const { data } = await fetchData(url);
      if (data) {
        setLocationData({
          locationName: data.locationName,
          photoSrc: data.photoSrc
        });
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
                src={!locationData.photoSrc ? img : img}
                component="img"
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
