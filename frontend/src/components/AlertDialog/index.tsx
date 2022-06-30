import React, { MouseEventHandler } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
}: Props) => (
  <div>
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        You want to delete {deletingObject}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action will irreversibly and permanently delete {deletingObject}!
          Are you sure you want to permanently delete this {deletingObject}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Disagree</Button>
        <Button onClick={transmittHandlerFunction} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
export default AlertDialog;
