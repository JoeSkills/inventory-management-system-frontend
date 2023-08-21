import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useContext } from 'react';
import { handleItemDelete } from '../../utils';
import { AlertDialogContext } from '../../context';

const AlertDialog = () => {
  const { setIsAlertDialogOpen, isAlertDialogOpen, itemId, refetch } =
    useContext(AlertDialogContext) || {};

  const handleAlertDialogClose = () => {
    setIsAlertDialogOpen && setIsAlertDialogOpen(false);
  };

  return (
    <Dialog
      open={isAlertDialogOpen || false}
      onClose={handleAlertDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Are you sure you want to delete the following item?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action cannot be undone. Deleting the item will permanently
          remove it from the inventory.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAlertDialogClose} autoFocus>
          Cancel
        </Button>

        <Button
          color="error"
          onClick={() => {
            handleAlertDialogClose();
            handleItemDelete(itemId, refetch);
          }}
        >
          Delete Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
