import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, CardMedia, CircularProgress, styled } from '@mui/material';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';
import { StyledBox, StyledMediaBox, StyledTooltip } from './style';
import icon from '../../static/map-point-svgrepo-com.svg';
import img from '../../static/image-not-found.jpg';

interface Props {
  id: string;
  position: [number, number];
}

export function LocationPopOut({ id, position }: Props) {
  const [locationData, setLocationData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sleep = (ms: number) =>
    new Promise(resolve => {
      setTimeout(resolve, ms);
    });

  const onOpenTooltip = async () => {
    if (!locationData) {
      setIsLoading(true);
      await sleep(3000);
      setLocationData('hello');
    }
    setIsLoading(false);
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
      position={position}
    >
      <StyledTooltip>
        <StyledBox>
          <StyledMediaBox>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <CardMedia
                sx={{ borderRadius: '20px' }}
                alt={locationData}
                src={locationData === 'hello' ? img : ''}
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
            {id}dmaskdnaskldnsakldjnaskldjkals
          </Typography>
        </StyledBox>
      </StyledTooltip>
    </Marker>
  );
}
