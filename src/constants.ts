import Inventory2Icon from '@mui/icons-material/Inventory2';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { ItemDataTableWidgetTableHeadData } from './types';

type TYPES_NAV_LINKS = {
  path: string;
  name: string;
  Icon: React.FC;
}[];

export const NAV_LINKS = [
  {
    path: '/',
    name: 'Dashboard',
    Icon: HomeIcon,
  },
  {
    path: '/new-product',
    name: 'New Product',
    Icon: ProductionQuantityLimitsIcon,
  },
  {
    path: '/inventory',
    name: 'Inventory',
    Icon: Inventory2Icon,
  },
  {
    path: '/transactions',
    name: 'Transactions',
    Icon: PaidIcon,
  },
  {
    path: '/reports',
    name: 'Reports',
    Icon: AssessmentIcon,
  },
  {
    path: '/settings',
    name: 'Settings',
    Icon: SettingsApplicationsIcon,
  },
] as TYPES_NAV_LINKS;

export const DRAWER_WIDTH: number = 250;

export const tableHeadData = [
  'Item ID',
  'Item Name',
  'Description',
  'Category',
  'Quantity',
  'Unit Price',
  'Supplier',
  'Date Added',
  'Last Updated',
  'Edit',
  'Delete',
] as ItemDataTableWidgetTableHeadData;
