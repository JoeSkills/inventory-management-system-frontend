import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { setLogin } from '../../../state';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your email address.')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .required('Please enter a password.')
    .min(5, 'Your password needs to be longer. At least 5 characters, please.'),
  username: Yup.string().required('Please choose a username.'),
});

const Form = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    toast.promise(
      axios
        .post('https://joe-ims-api.onrender.com/auth/signup', data)
        .then(({ data: { token, user } }) => {
          dispatch(setLogin({ token, user }));
          navigate('/');
        }),
      {
        loading: '"Creating your account. Please wait...',
        error:
          'An error occurred while signing up. Please check your information and try again.',
        success: 'Congratulations! Your account has been successfully created.',
      }
    );
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} justifyContent={'center'}>
          <Grid item sm={6} md={12}>
            <TextField
              fullWidth
              margin="dense"
              required
              label="Email"
              placeholder="user@example.com"
              {...register('email')}
              type="email"
              error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item sm={6} md={12}>
            <TextField
              fullWidth
              margin="dense"
              required
              label="Password"
              placeholder="P@ssw0rd123"
              {...register('password')}
              type="password"
              error={errors.password ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.password?.message}
            </Typography>
          </Grid>
          <Grid item sm={6} md={12}>
            <TextField
              fullWidth
              margin="dense"
              required
              label="Username"
              placeholder="myusername123"
              {...register('username')}
              error={errors.username ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.username?.message}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button type="submit" variant="contained">
            SignUp
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Form;
