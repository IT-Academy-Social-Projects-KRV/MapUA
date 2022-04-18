import React from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import PointPopup from 'components/PointPopup/PointPopup';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
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
    <Box>
      <ThemeProvider theme={theme}>
        <Drawer
          sx={{ width: '50%' }}
          anchor="left"
          hideBackdrop
          open={isOpen}
          onClose={toggleClose}
        >
          <IconButton
            onClick={toggleClose}
            sx={{
              borderRadius: 0,
              pr: '90%',
              position: 'static',
              display: 'inline',
              zIndex: 10
            }}
          >
            <ArrowLeftIcon />
          </IconButton>
          <Box sx={{ width: '40rem', mt: -10 }}>
            <PointPopup>
              {[
                {
                  locationName: 'Duke monument',
                  avatarMini:
                    'https://freepikpsd.com/file/2019/10/avatar-icon-png-5-Images-PNG-Transparent.png',
                  name: 'Вася Пупкин',
                  dateOfPublic: 'June 22, 2022',
                  likeCounter: 231,
                  description: `Nam nunc tortor, aliquam in nulla vel, tincidunt faucibus erat. Nunc cursus varius leo, 
            eget convallis est auctor ac. Quisque  sagittis commodo ipsum, ut mattis mauris rhoncus sit amet. Donec hendrerit, dui et porta feugiat, 
            eros nisi ullamcorper ex, vel venenatis quam nunc quis nunc. Phasellus ac orci non quam interdum auctor non ut lorem. Fusce lobortis pulvinar risus a laoreet. Nam congue nisi eu semper tincidunt. Integer eu risus massa. Sed non lorem elementum, dapibus ante sed, 
            elementum ex. Aliquam lacinia nisl at justo auctor, ut consectetur metus vehicula. Nullam ac tortor et diam sodales hendrerit quis eget urna. Etiam malesuada viverra rutrum. Nunc vel pulvinar eros, sed semper nisl.`,
                  comments: [
                    {
                      userCommentAvatar:
                        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
                      userCommentName: 'Vasya',
                      userCommentText: 'Beautiful place'
                    }
                  ]
                }
              ]}
            </PointPopup>
          </Box>
        </Drawer>
      </ThemeProvider>
    </Box>
  );
}
