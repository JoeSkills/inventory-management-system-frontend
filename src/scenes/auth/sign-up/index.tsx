import { Box, Typography } from '@mui/material';
import Form from './Form';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../assets/stacked-waves-haikei.svg';

const index = () => {
  return (
    <Box
      height="100%"
      justifyContent={'center'}
      display={'flex'}
      alignItems={'center'}
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Box
        width={{ xs: '100%', md: 400 }}
        bgcolor={'white'}
        padding={2}
        textAlign={'center'}
      >
        <Typography component={'div'}>
          <Typography fontWeight={'700'}>Welcome to Joseph's store!</Typography>
          Create an account to manage your store's inventory and keep track of
          your products. With your account, you can add, edit, and monitor your
          items effortlessly. Join our community of store owners and streamline
          your inventory management today.
        </Typography>
        <Typography fontWeight={'600'}>
          Please provide the following information to create your account:
        </Typography>
        <Form />
        <br />
        <Typography component={'div'}>
          Already have an account?{' '}
          <Typography
            fontWeight={'bold'}
            component={'span'}
            sx={{
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {' '}
            <Link to={'/auth/login'}>Login Here</Link>
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default index;
