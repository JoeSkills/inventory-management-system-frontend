import { Box, Typography } from '@mui/material';
import { ItemDataWrapperProps } from '../../types';

const ItemDataWrapper = ({
  itemColor,
  ItemIcon,
  itemName,
  itemValue,
}: ItemDataWrapperProps) => {
  return (
    <Box
      bgcolor={'white'}
      width={'fit-content'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      py={2}
      px={6}
      borderRadius={2}
      border="1px solid rgb(229, 234, 242)"
      gap={1}
      textAlign={'center'}
    >
      <Box
        bgcolor={itemColor}
        width={'fit-content'}
        py={2}
        px={3}
        borderRadius={2}
        color={'white'}
      >
        <ItemIcon style={{ width: '30px', height: '30px' }} />
      </Box>
      <Typography fontSize={'1.125rem'}>{itemValue}</Typography>
      <Typography fontWeight={'bold'} fontSize={'1.5rem'}>
        {itemName}
      </Typography>
    </Box>
  );
};

export default ItemDataWrapper;
