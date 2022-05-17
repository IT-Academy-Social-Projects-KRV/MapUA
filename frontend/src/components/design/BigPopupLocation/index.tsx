import React from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';

interface PopupProps extends React.PropsWithChildren<any> {
  isOpen: boolean;
  toggleClose: any;
}
export default function BigPopupLocation(props: PopupProps) {
  const { isOpen, toggleClose, children } = props;

  return (
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
        {children}
      </Drawer>
    </Box>
  );
}
