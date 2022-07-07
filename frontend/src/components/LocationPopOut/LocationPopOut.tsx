import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { CardMedia, Typography } from '@mui/material';
import { Marker } from 'react-leaflet';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useSearchParams } from 'react-router-dom';
import {
  StyledBox,
  StyledMediaBox,
  StyledTooltip
} from '../design/StyledLocationPopOut';
import verifiedIcon from '../../static/verified-icon.png';
import unverifiedIcon from '../../static/unverified-icon.png';
import waitingIcon from '../../static/waiting-icon.png';
import img from '../../static/image-not-found.jpg';

interface Props {
  id: string;
  coordinates: [number, number];
  locationName: string;
  arrayPhotos: string[];
  onOpenBigPopup: Function;
  verificationStatus: string;
}

export function LocationPopOut({
  id,
  coordinates,
  locationName,
  arrayPhotos,
  onOpenBigPopup,
  verificationStatus
}: Props) {
  const [, setSearchParams] = useSearchParams();
  const locationData = useTypedSelector(state => state.popupLocation);
  const { loading } = locationData;
  const { fetchPopupLocation } = useTypedDispatch();

  const [locationIcon, setLocationIcon] = useState<string>(verifiedIcon);

  useEffect(() => {
    if (verificationStatus === 'verified') {
      setLocationIcon(verifiedIcon);
    }

    if (verificationStatus === 'unverified') {
      setLocationIcon(unverifiedIcon);
    }

    if (verificationStatus === 'waiting') {
      setLocationIcon(waitingIcon);
    }
  }, [verificationStatus]);

  return (
    <Marker
      icon={L.icon({
        iconUrl: locationIcon,
        iconSize: [25, 40],
        iconAnchor: [20, 35]
      })}
      eventHandlers={{
        click: e => {
          if (!loading) {
            e.originalEvent.stopPropagation();
            fetchPopupLocation(id);
            setSearchParams({ locationName });
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
