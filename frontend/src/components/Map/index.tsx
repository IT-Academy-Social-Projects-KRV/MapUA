import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PointPopup from '../modals/pointPopup/PointPopup';
import { StyledMap } from './styles';

function Map() {
  const [popup, setPopup] = useState(false);

  return (
    <Box sx={{ width: '100%' }}>
      <StyledMap>
        <IconButton>
          <PlaceIcon
            sx={{ color: 'white' }}
            onClick={() => {
              setPopup(true);
            }}
          />
        </IconButton>

        <PointPopup active={popup} setActive={setPopup}>
          {[
            {
              text: 'Dynamic Text:',
              avatarMini: 'Ava',
              name: 'User Name'
            }
          ]}
        </PointPopup>
      </StyledMap>
    </Box>
  );
}

export default Map;
