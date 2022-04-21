import React from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import PointPopup from 'components/PointPopup/PointPopup';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { locationType } from '../../../types';

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          marginTop: '80px'
        }
      }
    }
  }
});
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
        <ThemeProvider theme={theme}>
          <Drawer
            sx={{ width: '35%' }}
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
            <Box sx={{ width: '40rem', mt: -10, mb: 10 }}>
              <PointPopup location={location} />
            </Box>
          </Drawer>
        </ThemeProvider>
      </Box>
    )
  );
}
