import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { ItemsDataFormProperties } from '../../types';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const sendItemsDataToDb = async (data: ItemsDataFormProperties) => {
  return await axios
    .get('https://joe-ims-api.onrender.com/api/items-data/total-items')
    .then(({ data: noOfProducts }) => {
      console.log('No of products: ', noOfProducts);
      const addProductsFuncRef = axios
        .post('https://joe-ims-api.onrender.com/api/items-data', {
          ...data,
          itemId: noOfProducts + 1,
          lastUpdated: new Date().toString(),
          dateAdded: new Date().toString(),
        })
        .then(console.log);
      toast.promise(addProductsFuncRef, {
        loading:
          'Product addition in progress. This might take a few seconds...',
        success:
          'Product added successfully. You can now view it in your inventory.',
        error:
          'Error: Unable to add the product. Please check your internet connection and try again.',
      });
    });
};

const validationSchema = Yup.object().shape({
  itemName: Yup.string().required('The name of the item is required'),
  description: Yup.string().required('The description of the item is required'),
  category: Yup.string().required('The category of the item is required'),
  quantity: Yup.number().required('The quantity of the item is required'),
  unitPrice: Yup.number().required('The unit price of the item is required'),
  supplier: Yup.string().required('The supplier of the item is required'),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: ItemsDataFormProperties) => {
    sendItemsDataToDb(data).then(() => reset());
  };

  return (
    <Box>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item sm={6}>
            <TextField
              label="Item Name"
              required
              fullWidth
              margin="dense"
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
              margin="dense"
              {...register('supplier')}
              error={errors.supplier ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.supplier?.message}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button variant="contained" type="submit">
            Add Product
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
