import * as React from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';

export default function BigPopup(props: any) {
  const { isOpen, togleClose } = props;

  const fon: any = true;

  return (
    <div>
      <Drawer
        sx={{ height: 100 }}
        anchor="left"
        hideBackdrop={fon}
        open={isOpen}
        onClose={togleClose}
      >
        <Box sx={{ width: 400, backgroundColor: '#757ce8', mt: 50 }}>
          <h2>Location</h2>
        </Box>
      </Drawer>
    </div>
  );
}
