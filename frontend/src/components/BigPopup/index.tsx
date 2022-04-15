import * as React from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          marginTop: '100px'
        }
      }
    }
  }
});
interface PopupProps {
  isOpen: boolean;
  toggleClose: any; // this function reatern set of useState
}
export default function BigPopup(props: PopupProps) {
  const { isOpen, toggleClose } = props;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Drawer
          sx={{ marginTop: 1000 }}
          anchor="left"
          hideBackdrop
          open={isOpen}
          onClose={toggleClose}
        >
          <Box sx={{ width: 400, mt: 50 }}>
            <h2>Location</h2>
          </Box>
        </Drawer>
      </ThemeProvider>
    </div>
  );
}
