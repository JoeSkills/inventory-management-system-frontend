import { Typography, Box } from '@mui/material';
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
          <Typography fontWeight={'700'}>
            Welcome back to Joseph's store!
          </Typography>
          Log in to your account to access your store's inventory and manage
          your products. With your account, you can easily edit items, track
          availability, and maintain a well-organized inventory. We're excited
          to have you back!
        </Typography>
        <Form />
        <br />
        <Typography component={'div'}>
          New to Joseph's Store?{' '}
          <Typography
            component={'span'}
            fontWeight={'600'}
            sx={{
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <Link to={'/auth/sign-up'}>SignUp</Link>
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default index;
