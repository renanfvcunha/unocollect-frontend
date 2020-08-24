import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import { ApplicationState } from '../../store';
import * as PageTitleActions from '../../store/modules/pageTitle/actions';
import useStyles from './styles';

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = 'Painel de Controle';

  useEffect(() => {
    dispatch(PageTitleActions.default(title));
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

export default connect((state: ApplicationState) => ({
  title: state.pageTitle.title,
}))(Dashboard);
