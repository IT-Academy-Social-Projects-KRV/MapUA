import React from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import { ArrowLeftIcon } from 'components/Icons';
import { StyledArrowLeftButton } from '../StyledArrowLeftButton';

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
        <StyledArrowLeftButton onClick={backArrowOnclick}>
          <ArrowLeftIcon />
        </StyledArrowLeftButton>
        {children}
      </Drawer>
    </Box>
  );
}
