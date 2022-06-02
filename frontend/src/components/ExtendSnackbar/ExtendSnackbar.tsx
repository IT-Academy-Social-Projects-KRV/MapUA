import React, { FC } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { AnyRecord } from 'dns';

type Props = {
  anchorOrigin: any;
  open: any;
  autoHideDuration: any;
  onClose: any;
  severity: any;
};

export const ExtendSnackbar: FC<Props> = ({
  anchorOrigin,
  open,
  autoHideDuration,
  onClose,
  severity
}) => {
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert severity={severity}></Alert>
    </Snackbar>
  );
};
