import { Box, Typography } from '@mui/material';
import NavbarWrapper from '../../helpers/NavbarWrapper';
import Form from './Form';

const index = NavbarWrapper(() => {
  return (
    <div>
      <Typography>
        Welcome to our Sales Page! Here, you can explore a record of our recent
        sales transactions. Discover a wide range of products, quantities,
        prices, and more. If you have any questions or need further information,
        feel free to reach out to us. Thank you for choosing us!
      </Typography>
      <Box mt={2}>
        <Typography mt={1}>Add a new sale</Typography>
        <Form />
      </Box>
    </div>
  );
});

export default index;
