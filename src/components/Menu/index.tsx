import React, { useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
  Dashboard as MdDashboard,
  Menu,
  ChevronLeft,
  ChevronRight,
  Group,
  Assignment,
  ExitToApp
} from '@material-ui/icons';
import { ApplicationState } from '../../store';
import { logout } from '../../store/modules/auth/actions';
import { useStyles, BlueGrey } from './styles';
import Routes from '../../routes';

interface Title {
  title: string;
}

const Header: React.FC<Title> = ({ title }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  };

  function handleDrawerClose() {
    setOpen(false);
  };

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
          <Toolbar>
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
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
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
              <span className={classes.welcome}>Olá, Renan.</span>
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
              <ListItem button>
                <ListItemIcon>
                  <MdDashboard className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Painel de Controle" />
              </ListItem>
            </List>
          </Link>

          <Link to="/forms" className={classes.link}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Assignment className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Formulários" />
              </ListItem>
            </List>
          </Link>

          <Link to="/users" className={classes.link}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Group className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
              </ListItem>
            </List>
          </Link>
          
          <Divider />

          <List>
            <ListItem button>
              <ListItemIcon onClick={handleLogout}>
                <ExitToApp className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Sair" onClick={handleLogout} />
            </ListItem>
          </List>
        </Drawer>

        {/** App Routes */}
        <Routes />
      </BrowserRouter>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default connect((state: ApplicationState) => ({
  title: state.pageTitle.title,
}))(Header);
