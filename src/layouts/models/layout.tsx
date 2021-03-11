import React, { PropsWithChildren, ReactElement, useState } from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Fab, Zoom } from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';

import useAuth from '@/hooks/useAuth';
import { AppRoutes } from '@/types/routes';

import Toolbar from './toolbar';
import Navigation from './navigation';
import clsx from 'clsx';

interface ModelsDesktopLayoutProps {
  brand: string;
  routes: AppRoutes;
}

export default function ModelsDashboard({
  brand,
  routes,
  children,
}: PropsWithChildren<ModelsDesktopLayoutProps>): ReactElement {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const { auth } = useAuth({ redirectTo: '/' });

  const toggleDrawer = (): void => setDrawerOpen((state) => !state);

  return (
    <div className={classes.root}>
      <Toolbar brand={brand}>
        <Zoom in={true} timeout={500}>
          <Box>
            <Fab size="medium" color="primary" onClick={toggleDrawer}>
              {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Fab>
          </Box>
        </Zoom>
      </Toolbar>

      <div className={classes.mainContainer}>
        <Navigation
          className={drawerOpen ? classes.drawerOpen : classes.drawerClosed}
          component="nav"
          permissions={auth.user?.permissions}
          routes={routes}
        />
        <main
          className={clsx(classes.mainContent, {
            [classes.mainContentShift]: drawerOpen,
          })}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
      overflowX: 'hidden',
    },
    mainContainer: {
      display: 'flex',
      height: `calc(100% - ${theme.spacing(18)})`,
    },
    drawerOpen: {
      width: '18rem',
    },
    drawerClosed: {
      width: 0,
    },
    mainContent: {
      padding: theme.spacing(3),
      width: '100%',
      transition: theme.transitions.create(['width'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.sharp,
      }),
    },
    mainContentShift: {
      width: `calc(100% - 18rem)`,
      transition: theme.transitions.create(['width'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.sharp,
      }),
    },
  });
});
