import { SvgIconProps } from '@mui/material/SvgIcon';

export type ItemDataWrapperProps = {
  itemName: string;
  itemColor: string;
  itemValue: number | string;
  ItemIcon: (props: SvgIconProps) => JSX.Element;
};

export type ItemDataTableWidgetTableHeadData = string[];

export type ItemDataTableProperties = {
  itemId: string | number;
  itemName: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  supplier: string;
  dateAdded: string;
  lastUpdated: string;
  _id: number | undefined;
};

export type ItemsDataFormProperties = {
  itemName: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  supplier: string;
};

export type ReduxState = {
  user: {
    username: string;
    _id: string;
    email: string;
    password: string;
  };
  token: string;
};
