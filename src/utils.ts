import axios from 'axios';
import { ItemDataTableProperties, ItemsDataFormProperties } from './types';
import { toast } from 'react-hot-toast';
import moment from 'moment';

export const hasItemBecomeInactive = (lastUpdated: string): boolean => {
  const lastUpdatedDate = new Date(lastUpdated);
  const currentDate = new Date();

  const differenceBetweenDates =
    currentDate.getTime() - lastUpdatedDate.getTime();
  const differenceInDays = differenceBetweenDates / (1000 * 3600 * 24);

  return differenceInDays >= 124;
};

export const getNumberOfActiveItems = (
  itemsData: ItemDataTableProperties[]
): number => {
  let noOfActiveItems = 0;
  itemsData.map((item) => {
    if (!hasItemBecomeInactive(item.lastUpdated))
      noOfActiveItems += item.quantity;
  });

  return noOfActiveItems;
};

export const calculateItemsStockValue = (
  itemsData: ItemDataTableProperties[]
): number => {
  return itemsData.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
};

export const handleItemDelete = (
  id: number | undefined,
  refetch: (() => void) | undefined
) => {
  toast.promise(
    axios
      .delete(`https://joe-ims-api.onrender.com/api/items-data/${id}`)
      .then((data) => {
        console.log(data);
        refetch && refetch();
      }),
    {
      loading: 'Deleting product. Please wait...',
      error:
        'Error: Unable to delete the product. Please check your internet connection and try again.',
      success: 'Success! The product has been deleted from your inventory.',
    }
  );
};

export const handleItemUpdate = (
  id: number | undefined,
  refetch: (() => void) | undefined,
  prevData: ItemDataTableProperties | undefined,
  currData: ItemsDataFormProperties
) => {
  toast
    .promise(
      axios
        .patch(`https://joe-ims-api.onrender.com/api/items-data/${id}`, {
          ...prevData,
          ...currData,
        })
        .then((data) => {
          console.log(data);
        }),
      {
        loading: 'Editing in progress. This may take a few seconds...',
        success: 'Success! The product details have been updated.',
        error:
          'Oops! Something went wrong while editing the product. Please try again later.',
      }
    )
    .then(() => refetch && refetch());
};

export const makeDateReadable = (prevDate: string): string =>
  moment(prevDate).format('YYYY-MM-DD HH:MM A');
