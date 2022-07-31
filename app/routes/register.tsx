import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getDocinfoListItems } from "~/models/docinfo.server";

export async function loader({ request }: LoaderArgs) {
  const docinfoListItems = await getDocinfoListItems();
  return json({ docinfoListItems });
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const drawerWidth = 180;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create(['width','margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const openedMixinOverlay = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create(['width','margin'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: 0,
  },
});

const closedMixinOverlay = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: 0,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'rgb(7 89 133);'
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
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
  }),
);

const OverlayDrawer = styled(MuiDrawer)(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixinOverlay(theme),
      '& .MuiDrawer-paper': openedMixinOverlay(theme),
    }),
    ...(!open && {
      ...closedMixinOverlay(theme),
      '& .MuiDrawer-paper': closedMixinOverlay(theme),
    }),
  }),
);

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DocInfoPage() {
  const data = useLoaderData<typeof loader>();
  const theme = useTheme();
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const [open, setOpen] = React.useState(true);
  const handleDrawerClick = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawer = (
    <div>
    <Toolbar />
        <Box sx={{ overflow: 'auto', overflowX: 'hidden' }}>
          <ol>
          {data.docinfoListItems.map((docinfo) => (
                <li key={docinfo.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-base ${isActive ? "bg-white" : ""}`
                    }
                    to={docinfo.id}
                    // onClick={handleDrawerClose}
                  >
                    📝 {docinfo.title}
                  </NavLink>
                </li>
              ))}
          </ol>
        </Box>
        </div>
  );

  return (
    <Box
      sx={{ display: 'flex' }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        className='bg-blue-500'
      >
        <Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClick}
              edge="start"
              sx={{
                marginRight: 1,
              }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
              Marx-Engels Digital Cyclopedia
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          overflowX: 'hidden',
          '& .MuiDrawer-paper': { boxSizing: 'border-box', flexShrink: 0, overflowX: 'hidden' },
        }}
        open={open}
      >
        {drawer}
      </Drawer>
      <MuiDrawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          onClick={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            width: drawerWidth,
            overflowX: 'hidden',
            '& .MuiDrawer-paper': { overflowX: 'hidden', width: drawerWidth, boxSizing: 'border-box' },
          }}
          anchor="left"
        >
          {drawer}
      </MuiDrawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="w-full"
      >
        <Toolbar />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={activeTab} index={0}>
          <Outlet />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Box>
  );
}
