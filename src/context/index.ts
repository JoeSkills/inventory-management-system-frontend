import { createContext } from 'react';
import { ItemDataTableProperties } from '../types';

export const AlertDialogContext = createContext<null | {
  setIsAlertDialogOpen: (value: boolean) => void;
  isAlertDialogOpen: boolean;
  refetch: () => void;
  itemId: number | undefined;
}>(null);

export const AlertFormDialogContext = createContext<null | {
  setIsAlertFormDialogOpen: (value: boolean) => void;
  isAlertFormDialogOpen: boolean;
  refetch: () => void;
  itemId: number | undefined;
  prevData: ItemDataTableProperties;
}>(null);
