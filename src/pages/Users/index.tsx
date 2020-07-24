import React, { useEffect, forwardRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import {
  PersonAdd,
  Clear,
  ChevronRight,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  ArrowDownward,
  Edit,
} from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';
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

  const tableIcons: Icons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
  };

  // const actions
  const edit = <Edit />;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className="button">
        <Button variant="contained" color="primary">
          <PersonAdd className={classes.iconAdd} />
          Novo Usuário
        </Button>
      </div>
      <div className={classes.table}>
        <MaterialTable
          columns={[
            { title: 'Id', field: 'id', type: 'numeric' },
            { title: 'Nome', field: 'name', type: 'string' },
            { title: 'Nome de Usuário', field: 'username', type: 'string' },
            { title: 'Administrador', field: 'admin', type: 'string' },
            { title: 'Ações', field: 'actions' },
          ]}
          data={[
            {
              id: 1,
              name: 'Renan Cunha',
              username: 'rcunha',
              admin: 'Sim',
            },
            { id: 2, name: 'Reginaldo Souza', username: 'regis', admin: 'Não' },
            { id: 3, name: 'Renan Cunha', username: 'rcunha', admin: 'Sim' },
            { id: 4, name: 'Reginaldo Souza', username: 'regis', admin: 'Não' },
            { id: 5, name: 'Renan Cunha', username: 'rcunha', admin: 'Sim' },
            { id: 6, name: 'Reginaldo Souza', username: 'regis', admin: 'Não' },
            { id: 7, name: 'Renan Cunha', username: 'rcunha', admin: 'Sim' },
            { id: 8, name: 'Reginaldo Souza', username: 'regis', admin: 'Não' },
            { id: 9, name: 'Renan Cunha', username: 'rcunha', admin: 'Sim' },
            {
              id: 10,
              name: 'Reginaldo Souza',
              username: 'regis',
              admin: 'Não',
            },
          ]}
          title="Lista de Usuários"
          icons={tableIcons}
          localization={{
            toolbar: {
              searchPlaceholder: 'Procurar',
              searchTooltip: 'Procurar',
            },
            pagination: {
              firstTooltip: 'Primeira Página',
              lastTooltip: 'Última Página',
              previousTooltip: 'Página Anterior',
              nextTooltip: 'Próxima Página',
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'linhas',
            },
          }}
        />
      </div>
    </main>
  );
};

export default connect((state: PageTitle) => ({
  title: state.pageTitle.title,
}))(Users);
