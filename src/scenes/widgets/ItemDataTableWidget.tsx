import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { tableHeadData } from '../../constants';
import { Box, IconButton, TableFooter, TablePagination } from '@mui/material';
import { ItemDataTableProperties } from '../../types';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ItemDataTableRowWidget from './ItemDataTableRowWidget';
import { Toaster } from 'react-hot-toast';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="next page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="last page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="first page"
      >
        <LastPageIcon />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="previous page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
}

const ItemDataTableWidget = () => {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data, isLoading, refetch } = useQuery(
    ['items-table-data', page, rowsPerPage],
    () =>
      axios
        .get('https://joe-ims-api.onrender.com/api/items-data', {
          params: {
            limit: rowsPerPage,
            page: page === 0 ? 1 : page * rowsPerPage,
          },
        })
        .then(({ data }) => data.data),
    {
      keepPreviousData: true,
    }
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    console.log(event);
  };

  const { data: totalItemsCount } = useQuery('total items count', () =>
    axios
      .get('https://joe-ims-api.onrender.com/api/items-data/total-items')
      .then(({ data }) => data)
  );

  const rows = data as ItemDataTableProperties[];

  if (isLoading) {
    return (
      <Box textAlign="center">Loading data for items from the database...</Box>
    );
  }

  return (
    <>
      <Box sx={{ overflow: 'auto' }}>
        <Toaster />
        <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Item Properties Table">
              <TableHead>
                <TableRow>
                  {tableHeadData.map((itemProps) => (
                    <TableCell key={itemProps}>{itemProps}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <ItemDataTableRowWidget
                    refetch={refetch}
                    row={row}
                    key={row._id}
                  />
                ))}
              </TableBody>
              {totalItemsCount && (
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[4, 10, 25]}
                      colSpan={7}
                      count={totalItemsCount}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default ItemDataTableWidget;
