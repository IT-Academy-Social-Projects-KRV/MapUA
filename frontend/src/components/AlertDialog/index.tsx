import React, { MouseEventHandler } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

interface Props {
  openDialog: boolean;
  transmittHandlerFunction: MouseEventHandler<HTMLButtonElement>;
  handleCloseDialog: MouseEventHandler<HTMLButtonElement>;
  deletingObject: string;
}

const AlertDialog = ({
  openDialog,
  transmittHandlerFunction,
  handleCloseDialog,
  deletingObject
}: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('alertdialog.tiltequestion')} {deletingObject}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('alertdialog.message')}
            {deletingObject}! {t('alertdialog.question')}
            {deletingObject}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {t('alertdialog.buttondisagree')}
          </Button>
          <Button onClick={transmittHandlerFunction} autoFocus>
            {t('alertdialog.buttonagree')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
