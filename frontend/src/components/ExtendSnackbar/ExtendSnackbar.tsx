import React, { FC } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

interface Props {
  positionVertical?: 'top' | 'bottom';
  positionHorizontal?: 'left' | 'center' | 'right';
  zIndex?: number | string;
  open?: boolean | undefined;
  notification?: string | {} | null;
  autoHideDuration?: number;
  onClose?: any;
  severity?: AlertColor | undefined;
}

const defaultProps: Props = {
  positionVertical: 'top',
  positionHorizontal: 'right',
  zIndex: 10000,
  open: false,
  notification: null,
  autoHideDuration: 3000,
  onClose: undefined,
  severity: 'error'
};

const ExtendSnackbar: FC<Props> = ({
  positionVertical = 'top',
  positionHorizontal = 'right',
  // zIndex = 'auto',
  // open = false,
  // notification = null,
  // autoHideDuration = 3000,
  // onClose = undefined,
  // severity = undefined
  zIndex,
  open,
  notification,
  autoHideDuration,
  onClose,
  severity
}) => (
  <Snackbar
    anchorOrigin={{
      vertical: positionVertical,
      horizontal: positionHorizontal
    }}
    sx={{ zIndex }}
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
  >
    <Alert onClose={onClose} severity={severity} sx={{ mt: '1vh' }}>
      {notification}
    </Alert>
  </Snackbar>
);

ExtendSnackbar.defaultProps = defaultProps;

export default ExtendSnackbar;
