import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as PageTitleActions from '../../store/actions/pageTitle';
import useStyles from './styles';

interface PageTitle {
  pageTitle: {
    title?: string;
  };
}

const Users: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = 'Usuários';

  useEffect(() => {
    dispatch(PageTitleActions.default(title));
  }, [dispatch]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <h1>Teste</h1>
    </main>
  );
};

export default connect((state: PageTitle) => ({
  title: state.pageTitle.title,
}))(Users);
