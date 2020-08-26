import React, {
  useState,
  useEffect,
  forwardRef,
  createRef,
  RefObject,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Refresh,
} from '@material-ui/icons';
import MaterialTable, { Icons, MaterialTableProps } from 'material-table';

import ModalConfirmation from '../../components/ModalConfirmation';
import ModalAlert from '../../components/ModalAlert';
import api from '../../services/api';
import { ApplicationState } from '../../store';
import setPageTitle from '../../store/modules/pageTitle/actions';
import {
  deleteUserRequest,
  setErrorFalse,
} from '../../store/modules/users/actions';
import { useStyles, theme } from './styles';

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
  const tableRef: RefObject<any> = createRef();

  const success = useSelector((state: ApplicationState) => state.users.success);
  const error = useSelector((state: ApplicationState) => state.users.error);
  const modalMsg = useSelector(
    (state: ApplicationState) => state.users.modalMsg,
  );
  const modalTitle = useSelector(
    (state: ApplicationState) => state.users.modalTitle,
  );

  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [userToRemove, setUserToRemove] = useState(0);
  const [name, setName] = useState('');

  const refreshTable = () => {
    tableRef.current.onQueryChange();
  };

  const handleRemoveUser = () => {
    setModalConfirmation(false);
    dispatch(deleteUserRequest(userToRemove));
    refreshTable();
  };

  const handleModalClose = () => {
    setModalConfirmation(false);
    setModalAlert(false);
  };

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
  }, [dispatch]);

  useEffect(() => {
    if (error || success) {
      setModalAlert(true);

      dispatch(setErrorFalse());
    }
  }, [error, success, dispatch]);

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
    <ThemeProvider theme={theme}>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div className="button">
          <Link to="/users/new">
            <Button variant="contained" color="primary">
              <PersonAdd className={classes.iconAdd} />
              Novo Usuário
            </Button>
          </Link>
        </div>

        <div className={classes.table}>
          <MaterialTable
            title="Lista de Usuários"
            tableRef={tableRef}
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
                  setModalConfirmation(true);
                  setName(rowData.name);
                  setUserToRemove(rowData.id);
                },
              },
              {
                icon: () => <Refresh />,
                tooltip: 'Atualizar',
                isFreeAction: true,
                onClick: () => refreshTable(),
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
        </div>

        <ModalConfirmation
          open={modalConfirmation}
          close={handleModalClose}
          confirmAction={handleRemoveUser}
          name={name}
          cancel="Cancelar"
          confirm="Remover"
        />
        <ModalAlert
          open={modalAlert}
          close={handleModalClose}
          title={modalTitle}
          msg={modalMsg}
        />
      </main>
    </ThemeProvider>
  );
};

export default Users;
