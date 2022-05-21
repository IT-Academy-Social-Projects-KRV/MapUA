import React from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';

type BigPopupProps = {
  isOpen: boolean;
  toggleClose: any;
};

export default function BigPopupLocation(
  props: React.PropsWithChildren<BigPopupProps>
) {
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
