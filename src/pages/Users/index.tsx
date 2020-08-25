import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
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

import ModalConfirmation from '../../components/ModalConfirmation';
import { useStyles, BtnStyle, TRow } from './styles';
import setPageTitle from '../../store/modules/pageTitle/actions';
import api from '../../services/api';

interface RowData {
  id: number;
  name: string;
  username: string;
  admin: string;
}

const Users: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageTitle = 'Usuários';

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
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
        <ThemeProvider theme={BtnStyle}>
          <Link to="/users/new">
            <Button variant="contained" color="primary">
              <PersonAdd className={classes.iconAdd} />
              Novo Usuário
            </Button>
          </Link>
        </ThemeProvider>
      </div>

      <div className={classes.table}>
        <ThemeProvider theme={TRow}>
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
            data={query =>
              new Promise(resolve => {
                const url = `users?per_page=${
                  query.pageSize
                }&page=${query.page + 1}&search=${query.search}`;
                api.get(url).then(response => {
                  resolve({
                    data: response.data.users,
                    page: response.data.page - 1,
                    totalCount: response.data.total,
                  });
                });
              })
            }
            actions={[
              {
                icon: () => <Edit />,
                tooltip: 'Editar Usuário',
                onClick: (event, rowData: RowData) =>
                  // eslint-disable-next-line no-alert
                  alert(`You saved ${rowData.name}`),
              },
              {
                icon: () => <Delete />,
                tooltip: 'Remover Usuário',
                onClick: (event, rowData: RowData) => {
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
              body: {
                emptyDataSourceMessage: 'Busca não obteve resultados',
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
              headerStyle: {
                backgroundColor: '#66bb6a',
                color: '#fff',
              },
            }}
          />
        </ThemeProvider>
      </div>

      <ModalConfirmation
        open={modalOpen}
        close={handleModalClose}
        confirmAction={() => {}}
        name={name}
        cancel="Cancelar"
        confirm="Remover"
      />
    </main>
  );
};

export default Users;
