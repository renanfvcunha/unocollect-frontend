import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import setPageTitle from '../../store/modules/pageTitle/actions';
import useStyles from './styles';
import { checkTokenRequest, logout } from '../../store/modules/auth/actions';
import { ApplicationState } from '../../store';

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = 'Painel de Controle';

  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    dispatch(setPageTitle(title));
  }, [dispatch]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography component="h1" variant="h3">
        Página em construção.
      </Typography>
    </main>
  );
};

export default Dashboard;
