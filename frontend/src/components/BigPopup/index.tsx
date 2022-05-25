import React from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackIos';
import PointPopup from '../PointPopup/PointPopup';

import { locationType } from '../../../types';

interface PopupProps {
  isOpen: boolean;
  toggleClose: any;
  location: locationType | null;
}
export default function BigPopup(props: PopupProps) {
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
          hideBackdrop
          open={isOpen}
          onClose={toggleClose}
        >
          <IconButton
            onClick={toggleClose}
            sx={{
              borderRadius: 0,
              pr: '88%',
              position: 'static',
              display: 'inline',
              zIndex: 10
            }}
          >
            <ArrowLeftIcon />
          </IconButton>
          <Box sx={{ width: '35rem' }}>
            <PointPopup />
          </Box>
        </Drawer>
      </Box>
    )
  );
}
