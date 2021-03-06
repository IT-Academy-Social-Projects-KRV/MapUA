import React, { memo } from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackIos';
import PointPopup from '../PointPopup/PointPopup';
import { StyledArrowLeftButton } from '../design/StyledArrowLeftButton';

import { locationType } from '../../../types';

interface PopupProps {
  isOpen: boolean;
  toggleClose: any;
  location: locationType | null;
}

function BigPopup(props: PopupProps) {
  const { isOpen, toggleClose, location } = props;

  return (
    location && (
      <Box>
        <Drawer
          sx={{ width: '35%' }}
          PaperProps={{
            style: { height: '77vh', marginTop: '85px' }
          }}
          anchor="left"
          open={isOpen}
          onClose={toggleClose}
        >
          <StyledArrowLeftButton onClick={toggleClose}>
            <ArrowLeftIcon />
          </StyledArrowLeftButton>
          <Box sx={{ width: '35rem' }}>
            <PointPopup toggleClose={toggleClose} />
          </Box>
        </Drawer>
      </Box>
    )
  );
}

export default memo(BigPopup);
