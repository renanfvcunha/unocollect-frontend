/* eslint-disable react/jsx-wrap-multilines */
import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  createRef,
  RefObject,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import MaterialTable, { Icons } from 'material-table';

import ModalConfirmation from '../../components/ModalConfirmation';
import ModalAlert from '../../components/ModalAlert';
import api from '../../services/api';
import { ApplicationState } from '../../store';
import setPageTitle from '../../store/modules/pageTitle/actions';
import {
  deleteUserRequest,
  setErrorFalse,
} from '../../store/modules/users/actions';
import { checkTokenRequest, logout } from '../../store/modules/auth/actions';
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
  const history = useHistory();
  const tableRef: RefObject<any> = createRef();

  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );

  const success = useSelector((state: ApplicationState) => state.users.success);
  const error = useSelector((state: ApplicationState) => state.users.error);
  const modalMsg = useSelector(
    (state: ApplicationState) => state.users.modalMsg,
  );
  const modalTitle = useSelector(
    (state: ApplicationState) => state.users.modalTitle,
  );

  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalRequestDataTitle, setModalRequestDataTitle] = useState('');
  const [modalRequestDataMsg, setModalRequestDataMsg] = useState('');
  const [modalAlert, setModalAlert] = useState(false);
  const [userToRemove, setUserToRemove] = useState(0);
  const [name, setName] = useState('');

  const refreshTable = useCallback(() => {
    if (success) {
      tableRef.current.onQueryChange();
    }
  }, [success, tableRef]);

  const handleRemoveUser = () => {
    setModalConfirmation(false);
    dispatch(deleteUserRequest(userToRemove));
  };

  const handleModalClose = () => {
    setModalConfirmation(false);
    setModalAlert(false);
  };

  const dataRequestFailure = () => {
    setModalAlert(true);
    setModalRequestDataTitle('Erro');
    setModalRequestDataMsg('Ocorreu um erro na requisição dos dados.');
  };

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
  }, [dispatch]);

  useEffect(() => {
    refreshTable();

    if (error || success) {
      setModalAlert(true);

      dispatch(setErrorFalse());
    }
  }, [error, success, refreshTable, dispatch]);

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

        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/users/new')}
        >
          <PersonAdd className={classes.iconAdd} />
          Novo Usuário
        </Button>

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
                  maxWidth: '5%',
                },
                cellStyle: {
                  maxWidth: '5%',
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
              },
              {
                title: 'Administrador',
                field: 'admin',
                type: 'string',
                align: 'left',
              },
              {
                title: 'Grupos',
                field: 'groups',
                type: 'string',
                align: 'left',
              },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                const url = `users?per_page=${
                  query.pageSize
                }&page=${query.page + 1}&search=${query.search}`;
                api
                  .get(url)
                  .then(response => {
                    resolve({
                      data: response.data.users,
                      page: response.data.page - 1,
                      totalCount: response.data.total,
                    });
                  })
                  .catch(() => {
                    reject(dataRequestFailure());
                  });
              })
            }
            actions={[
              {
                icon: () => <Edit />,
                tooltip: 'Editar Usuário',
                onClick: (event, rowData: RowData) =>
                  history.push(`/users/edit/${rowData.id}`),
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
                onClick: () => tableRef.current.onQueryChange(),
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
              actionsCellStyle: { width: '8%' },
              headerStyle: {
                backgroundColor: '#66bb6a',
                color: '#fff',
              },
              sorting: false,
            }}
          />
        </div>

        <ModalConfirmation
          open={modalConfirmation}
          close={handleModalClose}
          confirmAction={handleRemoveUser}
          title="Alerta de Exclusão"
          msg={
            <span>
              Deseja remover permanentemente{' '}
              <span style={{ fontWeight: 'bold' }}>{name}</span>?
            </span>
          }
          cancel="Cancelar"
          confirm="Remover"
        />
        <ModalAlert
          open={modalAlert}
          close={handleModalClose}
          title={modalTitle || modalRequestDataTitle}
          msg={modalMsg || modalRequestDataMsg}
        />
      </main>
    </ThemeProvider>
  );
};

export default Users;
