import React from 'react';
import { Drawer, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { ArrowLeftIcon } from 'components/Icons';

type BigPopupProps = {
  isOpen: boolean;
  toggleClose: any;
  setIsAddLocation: Function;
};

export default function BigPopupLocation(
  props: React.PropsWithChildren<BigPopupProps>
) {
  const { isOpen, toggleClose, children, setIsAddLocation } = props;

  const backArrowOnclick = () => {
    toggleClose();
    setIsAddLocation(false);
  };

  return (
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
        <IconButton
          onClick={backArrowOnclick}
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
        {children}
      </Drawer>
    </Box>
  );
}
