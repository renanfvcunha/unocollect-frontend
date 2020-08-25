import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import setPageTitle from '../../store/modules/pageTitle/actions';
import useStyles from './styles';

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = 'Painel de Controle';

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
