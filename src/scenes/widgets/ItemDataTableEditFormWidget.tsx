import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { AlertFormDialogContext } from '../../context';
import { Grid, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { ItemsDataFormProperties } from '../../types';
import { handleItemUpdate } from '../../utils';

const validationSchema = Yup.object().shape({
  itemName: Yup.string().required('The name of the item is required'),
  description: Yup.string().required('The description of the item is required'),
  category: Yup.string().required('The category of the item is required'),
  quantity: Yup.number().required('The quantity of the item is required'),
  unitPrice: Yup.number().required('The unit price of the item is required'),
  supplier: Yup.string().required('The supplier of the item is required'),
});

export default function FormDialog() {
  const {
    setIsAlertFormDialogOpen,
    isAlertFormDialogOpen,
    itemId,
    refetch,
    prevData,
  } = useContext(AlertFormDialogContext) || {};

  const handleAlertFormDialogClose = () => {
    setIsAlertFormDialogOpen && setIsAlertFormDialogOpen(false);
  };

  const { itemName, description, category, quantity, unitPrice, supplier } =
    prevData || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: ItemsDataFormProperties) => {
    handleItemUpdate(itemId, refetch, prevData, data);
  };

  return (
    <Dialog
      open={isAlertFormDialogOpen || false}
      onClose={handleAlertFormDialogClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Edit Item Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to edit the details of the following item. Please make
            your changes and then click the "Save" button.
          </DialogContentText>

          {prevData && (
            <Grid container spacing={1}>
              <Grid item sm={6}>
                <TextField
                  label="Item Name"
                  required
                  fullWidth
                  margin="dense"
                  defaultValue={itemName}
                  {...register('itemName')}
                  error={errors.itemName ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.itemName?.message}
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  label="Description"
                  required
                  fullWidth
                  defaultValue={description}
                  margin="dense"
                  {...register('description')}
                  error={errors.description ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.description?.message}
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  label="Category"
                  required
                  fullWidth
                  margin="dense"
                  defaultValue={category}
                  {...register('category')}
                  error={errors.category ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.category?.message}
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  label="Quantity"
                  required
                  fullWidth
                  type="number"
                  defaultValue={quantity}
                  margin="dense"
                  {...register('quantity')}
                  error={errors.quantity ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.quantity?.message}
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  label="Unit Price"
                  required
                  fullWidth
                  type="number"
                  defaultValue={unitPrice}
                  margin="dense"
                  {...register('unitPrice')}
                  error={errors.unitPrice ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.unitPrice?.message}
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  label="Supplier"
                  required
                  fullWidth
                  defaultValue={supplier}
                  margin="dense"
                  {...register('supplier')}
                  error={errors.supplier ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.supplier?.message}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertFormDialogClose}>Cancel</Button>
          <Button
            variant="contained"
            type="submit"
            color="warning"
            onClick={handleAlertFormDialogClose}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
