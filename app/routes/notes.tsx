import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import GitHubIcon from '@mui/icons-material/GitHub';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getNoteListItems } from "~/models/note.server";

export async function loader({ request }: LoaderArgs) {
  const noteListItems = await getNoteListItems();
  return json({ noteListItems });
}

const dbs = [
  {
    name: "Register",
    route: "reg",
    icon: "📕",
  },
  {
    name: "Chronicle",
    route: "chron",
    icon: "📅",
  },
];

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

/*
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
*/

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

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();
  const theme = useTheme();
  theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
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
          {dbs.map((db, index) => (
            <li>
            <NavLink
            className={({ isActive }) =>
              `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
            }
            to={db.route}
            > 
                  {db.icon}{" "}{open ? db.name : ""}
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
          <Typography variant="h4" noWrap component="div" sx={{flex:1}}>
              Marx-Engels Digital Cyclopedia
          </Typography>
          <a href="https://github.com/jpowerj/digital-marxism/" target='_blank'>
          <IconButton
            component="div"
            color="inherit"
            edge="end"
          >
            <GitHubIcon sx={{ fontSize: '2.2rem' }} />
          </IconButton>
          </a>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          height: '100%',
          //flexShrink: 0,
          overflowX: 'hidden',
          overflowY: 'scroll',
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            //flexShrink: 0,
            overflowX: 'hidden',
            overflowY: 'scroll',
          },
        }}
        disableScrollLock={true}
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
            overflowY: 'scroll',
            '& .MuiDrawer-paper': { overflowX: 'hidden', overflowY: 'scroll', width: drawerWidth, boxSizing: 'border-box' },
          }}
          disableScrollLock={true}
          anchor="left"
        >
          {drawer}
      </MuiDrawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, overflow: 'hidden', overflowY: 'scroll' }}
        className="w-full h-full"
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
