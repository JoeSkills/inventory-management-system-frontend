import { Box, Typography } from '@mui/material';
import ItemDataWrapper from '../widgets/ItemDataWrapper';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
  ItemDataTableProperties,
  ItemDataWrapperProps,
  ReduxState,
} from '../../types';
import ItemDataTableWidget from '../widgets/ItemDataTableWidget';
import axios from 'axios';
import { useQuery } from 'react-query';
import { calculateItemsStockValue, getNumberOfActiveItems } from '../../utils';
import NavbarWrapper from '../../helpers/NavbarWrapper';
import { useSelector } from 'react-redux';

const Index = NavbarWrapper(() => {
  const { username } = useSelector((state: ReduxState) => state.user);
  const { data } = useQuery('items data', () =>
    axios
      .get('http://localhost:8000/api/items-data', {
        params: {
          limit: 4,
          page: 1,
        },
      })
      .then(({ data }) => data.data as ItemDataTableProperties[])
      .catch(console.log)
  );
  const totalItems = data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const activeItems = (data && getNumberOfActiveItems(data)) || 0;
  const inactiveItems = totalItems - activeItems || 0;
  const stockValue = (data && calculateItemsStockValue(data)) || 0;

  const ItemDataWrapperData = [
    {
      itemColor: '#235789',
      itemValue: totalItems,
      itemName: 'Total Items',
      ItemIcon: StorefrontIcon,
    },
    {
      itemColor: '#4bc6b9',
      itemValue: activeItems,
      itemName: 'Active Items',
      ItemIcon: StoreIcon,
    },
    {
      itemColor: '#c1292e',
      itemValue: inactiveItems,
      itemName: 'Inactive Items',
      ItemIcon: ShoppingCartCheckoutIcon,
    },
    {
      itemColor: '#629677',
      itemValue: `NGN ${stockValue}`,
      itemName: 'Stock Value',
      ItemIcon: MonetizationOnIcon,
    },
  ] as ItemDataWrapperProps[];

  return (
    <>
      <Box>
        <Typography fontSize={'1.5rem'}>Dashboard</Typography>
        <Typography>Hi, {username}</Typography>
      </Box>
      <Box pt={3} display={'flex'} gap={3} flexWrap={'wrap'}>
        {ItemDataWrapperData.map((itemData) => {
          return <ItemDataWrapper {...itemData} key={itemData.itemName} />;
        })}
      </Box>
      <Box mt={5} mb={2}>
        <Typography fontSize={'1.5rem'} fontWeight={'600'}>
          All Items
        </Typography>
        <ItemDataTableWidget />
      </Box>
    </>
  );
});

export default Index;
