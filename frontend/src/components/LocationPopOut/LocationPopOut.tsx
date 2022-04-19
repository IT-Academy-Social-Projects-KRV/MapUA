import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, CardMedia } from '@mui/material';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
// import { useState } from 'react';
import icon from '../../static/map-point-svgrepo-com.svg';
// import img from '../../static/image-not-found.jpg';

interface Props {
  id: string;
  position: [number, number];
}

export function LocationPopOut({ id, position }: Props) {
  // const [locationData, setLocationData] = useState<string>('');

  const fetchOnHover = () => '';

  return (
    <Marker
      icon={L.icon({
        iconUrl: icon,
        iconSize: [30, 30]
      })}
      position={position}
    >
      <Tooltip onOpen={fetchOnHover}>
        <Box sx={{ width: '200px' }}>
          <CardMedia alt="" src="" component="img" />
          <Typography
            variant="h5"
            sx={{ padding: 5 }}
            textAlign="center"
            color="inherit"
          >
            {id}
          </Typography>
        </Box>
      </Tooltip>
    </Marker>
  );
}
