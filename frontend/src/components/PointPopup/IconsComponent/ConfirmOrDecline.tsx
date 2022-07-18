import React, { memo } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { t } from 'i18next';

interface Props {
  handleConfirmOrDeclineVerification: Function;
}

const ConfirmOrDecline = ({ handleConfirmOrDeclineVerification }: Props) => (
  <Box>
    <MenuItem onClick={() => handleConfirmOrDeclineVerification('verified')}>
      <ListItemIcon>
        <CheckCircleOutlineIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>{t('pointPopUp.confirmVerification')}</ListItemText>
    </MenuItem>
    <MenuItem onClick={() => handleConfirmOrDeclineVerification('unverified')}>
      <ListItemIcon>
        <CloseIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>{t('pointPopUp.declineVerification')}</ListItemText>
    </MenuItem>
  </Box>
);

export default memo(ConfirmOrDecline);
