import React, { useState, useEffect, forwardRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
  registration: number;
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
          <Link to="/users/new">
            <Button variant="contained" color="primary">
              <PersonAdd className={classes.iconAdd} />
              Novo Usuário
            </Button>
          </Link>
        </ThemeProvider>
      </div>

      <div className={classes.table}>
        <MaterialTable
          title="Lista de Usuários"
          columns={[
            {
              title: 'Id',
              field: 'id',
              type: 'numeric',
              align: 'left',
              headerStyle: {
                width: 'calc(5% + 0px)',
                maxWidth: 'calc(5% + 0px)',
              },
              cellStyle: {
                width: 'calc(5% + 0px)',
                maxWidth: 'calc(5% + 0px)',
              },
            },
            {
              title: 'Matrícula',
              field: 'registration',
              type: 'numeric',
              align: 'left',
              headerStyle: {
                width: 'calc(10% + 0px)',
                maxWidth: 'calc(10% + 0px)',
              },
              cellStyle: {
                width: 'calc(10% + 0px)',
                maxWidth: 'calc(10% + 0px)',
              },
            },
            {
              title: 'Nome',
              field: 'name',
              type: 'string',
              align: 'left',
            },
            {
              title: 'Nome de Usuário',
              field: 'username',
              type: 'string',
              align: 'left',
              headerStyle: {
                width: 'calc(15% + 0px)',
                maxWidth: 'calc(15% + 0px)',
              },
              cellStyle: {
                width: 'calc(15% + 0px)',
                maxWidth: 'calc(15% + 0px)',
              },
            },
            {
              title: 'Administrador',
              field: 'admin',
              type: 'string',
              align: 'left',
              headerStyle: {
                width: 'calc(15% + 0px)',
                maxWidth: 'calc(15% + 0px)',
              },
              cellStyle: {
                width: 'calc(15% + 0px)',
                maxWidth: 'calc(15% + 0px)',
              },
            },
          ]}
          data={[
            {
              id: 1,
              registration: 2549,
              name: 'Renan Fabrício Vieira da Cunha',
              username: 'rcunha',
              admin: 'Sim',
            },
            {
              id: 2,
              registration: 2560,
              name: 'Reginaldo Souza',
              username: 'regis',
              admin: 'Não',
            },
          ]}
          actions={[
            {
              icon: () => <Edit className={classes.iconEdit} />,
              tooltip: 'Editar Usuário',
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
            actionsCellStyle: { width: 'calc(5% + 0px)' },
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
