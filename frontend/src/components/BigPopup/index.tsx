import * as React from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';

interface PopupProps {
  isOpen: boolean;
  toggleClose: any; // this function reatern set of useState
}
export default function BigPopup(props: PopupProps) {
  const { isOpen, toggleClose } = props;

  const blackPage: boolean = true;

  return (
    <div>
      <Drawer
        sx={{ marginTop: 300 }}
        anchor="left"
        hideBackdrop={blackPage}
        open={isOpen}
        onClose={toggleClose}
      >
        <Box sx={{ width: 400, mt: 50 }}>
          <h2>Location</h2>
        </Box>
      </Drawer>
    </div>
  );
}
