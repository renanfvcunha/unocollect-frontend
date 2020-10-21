import React, { useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { useTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  Home,
  Menu,
  ChevronLeft,
  ChevronRight,
  Group,
  GroupOutlined,
  Assignment,
  ExitToApp,
  Room,
} from '@material-ui/icons';

import { ApplicationState } from '../../store';
import { logout } from '../../store/modules/auth/actions';
import { useStyles, BlueGrey } from './styles';
import Routes from '../../routes';

const Header: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const title = useSelector((state: ApplicationState) => state.pageTitle.title);
  const name = useSelector((state: ApplicationState) => state.auth.user.name);

  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={BlueGrey}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="primary"
        >
          <Toolbar className={classes.toolbarFlex}>
            <div className={classes.toolbarFlexLeft}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" noWrap style={{ display: 'inline' }}>
                {title}
              </Typography>
            </div>
            <img
              src="/assets/images/logoUnoCollect.png"
              alt="Logo Uno Collect"
              width="50"
              height="50"
            />
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      {/** App Navigation */}
      <BrowserRouter>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div>
            <div className={classes.toolbar}>
              <span className={classes.welcome}>
                {name ? `Olá, ${name.split(' ')[0]}` : ''}
              </span>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRight className={classes.icon} />
                ) : (
                  <ChevronLeft className={classes.icon} />
                )}
              </IconButton>
            </div>
          </div>

          <Divider />

          <Link to="/" className={classes.link}>
            <List>
              <ListItem button selected={window.location.pathname === '/'}>
                <ListItemIcon>
                  <Home className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Início" />
              </ListItem>
            </List>
          </Link>

          <Link to="/forms" className={classes.link}>
            <List>
              <ListItem
                button
                selected={window.location.pathname.split('/')[1] === 'forms'}
              >
                <ListItemIcon>
                  <Assignment className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Formulários" />
              </ListItem>
            </List>
          </Link>

          <Link to="/groups" className={classes.link}>
            <List>
              <ListItem
                button
                selected={window.location.pathname.split('/')[1] === 'groups'}
              >
                <ListItemIcon>
                  <GroupOutlined className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Grupos" />
              </ListItem>
            </List>
          </Link>

          <Link to="/map" className={classes.link}>
            <List>
              <ListItem
                button
                selected={window.location.pathname.split('/')[1] === 'map'}
              >
                <ListItemIcon>
                  <Room className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Mapa" />
              </ListItem>
            </List>
          </Link>

          <Link to="/users" className={classes.link}>
            <List>
              <ListItem
                button
                selected={window.location.pathname.split('/')[1] === 'users'}
              >
                <ListItemIcon>
                  <Group className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
              </ListItem>
            </List>
          </Link>

          <Divider />

          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItem>
          </List>
        </Drawer>

        {/** App Routes */}
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default Header;
