import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PointPopup from '../modals/pointPopup/PointPopup';
import { StyledMap } from './styles';

function Map() {
  const [popup, setPopup] = useState(false);

  // <PlaceIcon/> simulates a point on the map
  // I need a data for normal implementation
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
              locationName: 'LOCATION NAME',
              avatarMini: 'AVA',
              name: 'User Name',
              dateOfPublic: 'June 22, 2022',
              likeCounter: 231,
              comments:
                'Hidden section that opens after clicking on this little down arrow'
            }
          ]}
        </PointPopup>
      </StyledMap>
    </Box>
  );
}

export default Map;
