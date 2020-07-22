import React, { useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
  MdDashboard,
  MdMenu,
  MdChevronLeft,
  MdChevronRight,
  MdPeople,
} from 'react-icons/md';
import Dashboard from '../../pages/Dashboard';

import { useStyles, BlueGrey } from './styles';
import Users from '../../pages/Users';

interface PageTitle {
  pageTitle: {
    title?: string;
  };
}

interface Title {
  title?: string;
}

const Header: React.FC<Title> = ({ title }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
              <MdMenu color="#fff" />
            </IconButton>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      {/** App Routes And Navigation */}
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
                  <MdChevronRight color="#fff" />
                ) : (
                  <MdChevronLeft color="#fff" />
                )}
              </IconButton>
            </div>
          </div>

          <Divider />

          <Link to="/" className={classes.link}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <MdDashboard color="#fff" size={20} />
                </ListItemIcon>
                <ListItemText primary="Painel de Controle" />
              </ListItem>
            </List>
          </Link>

          <Link to="/users" className={classes.link}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <MdPeople color="#fff" size={20} />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
              </ListItem>
            </List>
          </Link>
        </Drawer>

        <Route exact path="/" component={Dashboard} />
        <Route path="/users" component={Users} />
      </BrowserRouter>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: '',
};

export default connect((state: PageTitle) => ({
  title: state.pageTitle.title,
}))(Header);
