import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';
import { ItemDataTableProperties, ReduxState } from '../../types';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';

const Form = () => {
  const validationSchema = Yup.object().shape({
    totalAmount: Yup.number().required(
      'The total amount you made in the sale is required'
    ),
    items: Yup.array()
      .required('Please select an item')
      .min(1, 'Please select an item'),
    notes: Yup.string().required(
      "Please add something, if there's anything about the transaction"
    ),
    quantities: Yup.array()
      .required('Please add a quantity')
      .min(1, 'Please add a quantity'),
  });

  const { _id } = useSelector((state: ReduxState) => state.user);

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const { data, isLoading } = useQuery('products', () =>
    axios
      .get('http://localhost:8000/api/items-data/')
      .then(({ data: { data } }) => data)
  );

  const productOptions =
    (data &&
      data.map(
        ({ _id, itemName, quantity, unitPrice }: ItemDataTableProperties) => {
          return {
            value: { product: _id, quantity, unitPrice },
            label: itemName,
          };
        }
      )) ||
    [];

  const onSubmit = (data: {
    totalAmount: number;
    notes: string | undefined;
    quantities: { label: string; value: string }[];
    items: {
      label: string;
      value: {
        product: string;
        quantity: string;
        unitPrice: string;
      };
    }[];
  }) => {
    const { totalAmount, notes, quantities } = data;
    const valueOfItems = data.items.map(({ value }, index) => {
      return { ...value, quantity: quantities[index].value };
    });

    toast.promise(
      axios
        .post('http://localhost:8000/api/transactions/sales/', {
          user: _id,
          createdAt: new Date().toString(),
          items: valueOfItems,
          totalAmount,
          notes,
        })
        .then(console.log),
      {
        loading: 'Please wait while we process your sale...',
        success: 'Success! Your sale has been added.',
        error:
          "Oops! Something went wrong. We couldn't add your sale. Please try again later.",
      }
    );
  };

  if (isLoading) {
    return <Box mt={2}>Getting products data from the database...</Box>;
  }

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item sm={6}>
            <TextField
              type="number"
              required
              fullWidth
              margin="dense"
              label="Total Amount"
              {...register('totalAmount')}
              error={errors.totalAmount ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.totalAmount?.message}
            </Typography>
          </Grid>
          <Grid item sm={6} mt={1}>
            <Controller
              name={'items'}
              control={control}
              render={({ field }) => {
                return (
                  <CreatableSelect
                    isMulti
                    {...field}
                    options={productOptions}
                    placeholder="Select The Products Sold"
                  />
                );
              }}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.items?.message}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <TextField
              type="string"
              fullWidth
              margin="dense"
              label="Notes"
              required
              multiline
              rows={4}
              defaultValue={'Nothing special to add'}
              {...register('notes')}
              error={errors.notes ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.notes?.message}
            </Typography>
          </Grid>
          <Grid item sm={6} mt={1}>
            <Controller
              name={'quantities'}
              control={control}
              render={({ field }) => {
                return (
                  <CreatableSelect
                    isMulti
                    {...field}
                    placeholder="The quantities of the products sold in order"
                  />
                );
              }}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.quantities?.message}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button type="submit" variant="contained">
            Add Sale
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Form;
