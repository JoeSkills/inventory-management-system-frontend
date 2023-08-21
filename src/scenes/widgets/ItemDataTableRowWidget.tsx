import { IconButton, TableCell, TableRow } from '@mui/material';
import { ItemDataTableProperties } from '../../types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlertDialogContext, AlertFormDialogContext } from '../../context';
import ItemTableDeleteAlertWidget from './ItemTableDeleteAlertWidget';
import ItemDataTableEditFormWidget from './ItemDataTableEditFormWidget';
import { useState } from 'react';

const ItemDataTableRowWidget = ({
  row,
  refetch,
}: {
  row: ItemDataTableProperties;
  refetch: () => void;
}) => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState<boolean>(false);

  const [isAlertFormDialogOpen, setIsAlertFormDialogOpen] =
    useState<boolean>(false);

  const handleAlertDialogOpen = () => setIsAlertDialogOpen(true);

  const handleAlertFormDialogOpen = () => setIsAlertFormDialogOpen(true);

  return (
    <TableRow
      key={row.itemId}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.itemId}
      </TableCell>
      <TableCell align="right">{row.itemName}</TableCell>
      <TableCell align="right">{row.description}</TableCell>
      <TableCell align="right">{row.category}</TableCell>
      <TableCell align="right">{row.quantity}</TableCell>
      <TableCell align="right">{row.unitPrice}</TableCell>
      <TableCell align="right">{row.supplier}</TableCell>
      <TableCell align="right">{row.dateAdded}</TableCell>
      <TableCell align="right">{row.lastUpdated}</TableCell>
      <TableCell align="right">
        <AlertFormDialogContext.Provider
          value={{
            isAlertFormDialogOpen,
            setIsAlertFormDialogOpen,
            refetch,
            itemId: row._id,
            prevData: row,
          }}
        >
          <ItemDataTableEditFormWidget />
          <IconButton color="warning" onClick={handleAlertFormDialogOpen}>
            <EditIcon />
          </IconButton>
        </AlertFormDialogContext.Provider>
      </TableCell>
      <TableCell align="right">
        <AlertDialogContext.Provider
          value={{
            isAlertDialogOpen,
            setIsAlertDialogOpen,
            refetch,
            itemId: row._id,
          }}
        >
          <ItemTableDeleteAlertWidget />
          <IconButton color="error" onClick={handleAlertDialogOpen}>
            <DeleteIcon />
          </IconButton>
        </AlertDialogContext.Provider>
      </TableCell>
    </TableRow>
  );
};

export default ItemDataTableRowWidget;
