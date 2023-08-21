import { useState } from 'react';
import { DRAWER_WIDTH, NAV_LINKS } from '../../constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject } from '@emotion/react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../state';
import { ReduxState } from '../../types';
import FlexBetween from '../../components/FlexBetween';

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'white',
  boxShadow: 'none',
  border: '1px solid rgb(229, 234, 242)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Index = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { username } = useSelector((state: ReduxState) => state.user);

  const { pathname } = useLocation();

  const isCurrentRoute = (path: string): string =>
    path === pathname ? '#6699cc' : '';

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box display={'flex'}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <FlexBetween
            width={'100%'}
            justifyContent={{ xs: 'flex-end', sm: 'space-between' }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <IconButton onClick={handleDrawerOpen}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Avatar sx={{ backgroundColor: 'primary.main' }}>
                {username[0]}
              </Avatar>
              <Box>
                <Typography
                  fontSize={'0.875rem'}
                  color={'black'}
                  fontWeight={'600'}
                >
                  {username}
                </Typography>
              </Box>
            </Box>
          </FlexBetween>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <List>
          {NAV_LINKS.map(({ path, name, Icon }) => (
            <ListItem
              key={name}
              disablePadding
              sx={{ display: 'block', color: isCurrentRoute(path) }}
            >
              <Link to={path}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: isCurrentRoute(path) }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => {
                dispatch(setLogout());
                navigate('/auth/login');
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" bgcolor={'#FBFFFF'} p={3} flexGrow={1}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Index;
