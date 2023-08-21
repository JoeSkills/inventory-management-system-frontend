import { themeSettings } from './theme';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/homePage';
import Reports from './scenes/reports';
import Inventory from './scenes/inventory';
import AddProducts from './scenes/add-products';
import Transactions from './scenes/transactions';
import Settings from './scenes/settings';
import SignUp from './scenes/auth/sign-up';
import Login from './scenes/auth/login';
import { QueryClient, QueryClientProvider } from 'react-query';

const theme = createTheme(themeSettings);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/new-product" element={<AddProducts />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              <Route path="/auth/login" element={<Login />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
