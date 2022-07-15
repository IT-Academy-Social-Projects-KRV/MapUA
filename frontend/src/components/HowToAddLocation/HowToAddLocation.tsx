import * as React from 'react';
import HelpIcon from '@mui/icons-material/Help';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Box
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import verifiedMarker from '../../static/verified-icon.svg';
import waitingMarker from '../../static/waiting-icon.svg';
import unVerifiedMarker from '../../static/unverified-icon.svg';
import createMarker from '../../static/creation-icon.svg';
import { Text, ButtonTitle } from '../design/StyledHowToStart';

export default function HowToAddLocation() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <ButtonTitle
        data-testid="button-open"
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ color: 'white' }}
      >
        {t('navBar.howToUse')}
        <HelpIcon sx={{ ml: '5px' }} />
      </ButtonTitle>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle data-testid="dialog-title" id="alert-dialog-title">
          {t('infoPopUp.header')}
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Box
            id="alert-dialog-description"
            sx={{ fontSize: '20px', maxHeight: '63vh' }}
          >
            <Box>
              <Box
                component="img"
                sx={{
                  height: 25,
                  width: 25
                }}
                src={verifiedMarker}
              />
              {t('infoPopUp.verifiedMarker')}
            </Box>
            <Box>
              <Box
                component="img"
                sx={{
                  height: 25,
                  width: 25
                }}
                src={waitingMarker}
              />
              {t('infoPopUp.waitingMarker')}
            </Box>
            <Box>
              <Box
                component="img"
                sx={{
                  height: 25,
                  width: 25
                }}
                src={unVerifiedMarker}
              />
              {t('infoPopUp.unVerifiedMarker')}
            </Box>
            <Box>
              <Box
                component="img"
                sx={{
                  height: 25,
                  width: 25
                }}
                src={createMarker}
              />
              {t('infoPopUp.createMarker')}
            </Box>
            <Text>{t('infoPopUp.howLocationCreateStep1')}</Text>
            <Text>{t('infoPopUp.howLocationCreateStep2')}</Text>
            <Text>{t('infoPopUp.howLocationCreateStep3')}</Text>
            <Text>{t('infoPopUp.howLocationCreateStep4')}</Text>
            <Text>{t('infoPopUp.howLocationCreateStep5')}</Text>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            data-testid="button-close"
            onClick={handleClose}
            sx={{ fontSize: '20px' }}
          >
            {t('infoPopUp.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
