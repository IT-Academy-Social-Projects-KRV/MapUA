import React from 'react';
import { Drawer, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { ArrowLeftIcon } from 'components/Icons';

type BigPopupProps = {
  isOpen: boolean;
  toggleClose: any;
  setIsAddLocationActive: Function;
};

export default function BigPopupLocation(
  props: React.PropsWithChildren<BigPopupProps>
) {
  const { isOpen, toggleClose, children, setIsAddLocationActive } = props;

  const backArrowOnclick = () => {
    toggleClose();
    setIsAddLocationActive(false);
  };

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
