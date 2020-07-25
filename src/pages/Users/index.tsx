import React, { useState, useEffect, forwardRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Button, ThemeProvider } from '@material-ui/core';
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
  Delete,
} from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';
import * as PageTitleActions from '../../store/actions/pageTitle';
import Modal from '../../components/Modal';
import { useStyles, Blue } from './styles';

interface PageTitle {
  pageTitle: {
    title?: string;
  };
}

interface IRowData {
  id: number;
  name: string;
  username: string;
  admin: string;
}

const Users: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = 'Usuários';

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  };

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

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <div className="button">
        <ThemeProvider theme={Blue}>
          <Button variant="contained" color="primary">
            <PersonAdd className={classes.iconAdd} />
            Novo Usuário
          </Button>
        </ThemeProvider>
      </div>

      <div className={classes.table}>
        <MaterialTable
          title="Lista de Usuários"
          columns={[
            { title: 'Id', field: 'id', type: 'numeric' },
            { title: 'Nome', field: 'name', type: 'string' },
            { title: 'Nome de Usuário', field: 'username', type: 'string' },
            { title: 'Administrador', field: 'admin', type: 'string' },
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
          actions={[
            {
              icon: () => <Edit className={classes.iconEdit} />,
              tooltip: 'Editar Usuário',
              iconProps: { style: { float: 'right' } },
              onClick: (event, rowData: IRowData) =>
                // eslint-disable-next-line no-alert
                alert(`You saved ${rowData.name}`),
            },
            {
              icon: () => <Delete className={classes.iconDelete} />,
              tooltip: 'Remover Usuário',
              onClick: (event, rowData: IRowData) => {
                setModalOpen(true);
                setName(rowData.name);
              },
            },
          ]}
          icons={tableIcons}
          localization={{
            toolbar: {
              searchPlaceholder: 'Procurar',
              searchTooltip: 'Procurar',
            },
            header: {
              actions: 'Ações',
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
          options={{
            actionsColumnIndex: -1,
            actionsCellStyle: { paddingRight: 25 },
          }}
        />
      </div>

      <Modal
        open={modalOpen}
        close={handleModalClose}
        name={name}
        cancel="Cancelar"
        del="Remover"
      />
    </main>
  );
};

export default connect((state: PageTitle) => ({
  title: state.pageTitle.title,
}))(Users);
