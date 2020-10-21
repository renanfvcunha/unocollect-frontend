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
import { ThemeProvider, Button } from '@material-ui/core';
import {
  Assignment,
  Category,
  Clear,
  ChevronRight,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  ArrowDownward,
  Visibility,
  Delete,
  Refresh,
  Edit,
  SettingsPower,
} from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';

import api from '../../services/api';
import { ApplicationState } from '../../store';
import setPageTitle from '../../store/modules/pageTitle/actions';
import {
  deleteFormRequest,
  alterFormStatusRequest,
  setErrorFalse,
} from '../../store/modules/forms/actions';
import ModalConfirmation from '../../components/ModalConfirmation';
import ModalAlert from '../../components/ModalAlert';
import { checkTokenRequest, logout } from '../../store/modules/auth/actions';
import { useStyles, theme, catBtn } from './styles';

interface RowData {
  id: number;
  title: string;
  category?: string;
  fills: number;
  status: string;
  created_at: Date;
}

const Forms: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const pageTitle = 'Formulários';
  const tableRef: RefObject<any> = createRef();

  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );

  const success = useSelector((state: ApplicationState) => state.forms.success);
  const error = useSelector((state: ApplicationState) => state.forms.error);
  const modalMsg = useSelector(
    (state: ApplicationState) => state.forms.modalMsg,
  );
  const modalTitle = useSelector(
    (state: ApplicationState) => state.forms.modalTitle,
  );

  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalRequestDataTitle, setModalRequestDataTitle] = useState('');
  const [modalRequestDataMsg, setModalRequestDataMsg] = useState('');
  const [modalConfTitle, setModalConfTitle] = useState('');
  const [modalConfMsg, setModalConfMsg] = useState<JSX.Element>();
  const [modalConfActTxt, setModalConfActTxt] = useState('');
  const [formId, setFormId] = useState(0);

  const refreshTable = useCallback(() => {
    if (success) {
      tableRef.current.onQueryChange();
    }
  }, [tableRef, success]);

  const handleModalClose = () => {
    setModalConfirmation(false);
    setModalAlert(false);
  };

  const handleConfirmAction = () => {
    if (modalConfActTxt === 'Ativar') {
      setModalConfirmation(false);
      dispatch(alterFormStatusRequest(formId, '1'));
    } else if (modalConfActTxt === 'Desativar') {
      setModalConfirmation(false);
      dispatch(alterFormStatusRequest(formId, '0'));
    } else {
      setModalConfirmation(false);
      dispatch(deleteFormRequest(formId));
    }
  };

  const dataRequestFailure = () => {
    setModalAlert(true);
    setModalRequestDataTitle('Erro');
    setModalRequestDataMsg('Ocorreu um erro na requisição dos dados.');
  };

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

  return (
    <ThemeProvider theme={theme}>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 24 }}
          onClick={() => history.push('/forms/new')}
        >
          <Assignment style={{ marginRight: 8 }} />
          Novo Formulário
        </Button>

        <ThemeProvider theme={catBtn}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: 24, marginLeft: 16 }}
            onClick={() => history.push('/forms/categories')}
          >
            <Category style={{ marginRight: 8 }} />
            Categorias
          </Button>
        </ThemeProvider>

        <div className={classes.table}>
          <MaterialTable
            title="Lista de Formulários"
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
                title: 'Título do Formulário',
                field: 'title',
                type: 'string',
                align: 'left',
                headerStyle: {
                  width: '20%',
                  maxWidth: '20%',
                },
                cellStyle: {
                  width: '20%',
                  maxWidth: '20%',
                },
              },
              {
                title: 'Categoria',
                field: 'category',
                type: 'string',
                align: 'left',
              },
              {
                title: 'Preenchimentos',
                field: 'fills',
                type: 'string',
                align: 'left',
                headerStyle: {
                  maxWidth: '10%',
                },
                cellStyle: {
                  maxWidth: '10%',
                },
              },
              {
                title: 'Grupos',
                field: 'groups',
                type: 'string',
                align: 'left',
                headerStyle: {
                  maxWidth: '20%',
                },
                cellStyle: {
                  maxWidth: '20%',
                },
              },
              {
                title: 'Status',
                field: 'status',
                type: 'string',
                align: 'left',
                headerStyle: {
                  maxWidth: '5%',
                },
                cellStyle: {
                  maxWidth: '5%',
                },
              },
              {
                title: 'Criado Em',
                field: 'created_at',
                type: 'datetime',
                align: 'left',
              },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                const url = `forms?per_page=${
                  query.pageSize
                }&page=${query.page + 1}&search=${query.search}`;
                api
                  .get(url)
                  .then(response => {
                    resolve({
                      data: response.data.forms,
                      page: response.data.page - 1,
                      totalCount: response.data.total,
                    });
                  })
                  .catch(() => {
                    reject(dataRequestFailure());
                  });
              })
            }
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
            actions={[
              {
                icon: () => <Visibility />,
                tooltip: 'Visualizar Preenchimentos',
                onClick: (event, rowData: RowData) =>
                  history.push(`/forms/${rowData.id}`),
              },
              {
                icon: () => <SettingsPower />,
                tooltip: 'Ativar / Desativar Formulário',
                onClick: (event, rowData: RowData) => {
                  setModalConfirmation(true);
                  setModalConfTitle('');
                  if (rowData.status === 'Ativo') {
                    setModalConfMsg(
                      <span>
                        Deseja desativar o formulário &quot;
                        <span style={{ fontWeight: 'bold' }}>
                          {rowData.title}
                        </span>
                        &quot;?
                      </span>,
                    );
                    setModalConfActTxt('Desativar');
                  } else {
                    setModalConfMsg(
                      <span>
                        Deseja ativar o formulário &quot;
                        <span style={{ fontWeight: 'bold' }}>
                          {rowData.title}
                        </span>
                        &quot;?
                      </span>,
                    );
                    setModalConfActTxt('Ativar');
                  }
                  setFormId(rowData.id);
                },
              },
              {
                icon: () => <Edit />,
                tooltip: 'Editar Formulário',
                onClick: (event, rowData: RowData) =>
                  history.push(`/forms/edit/${rowData.id}`),
              },
              {
                icon: () => <Delete />,
                tooltip: 'Remover Formulário',
                onClick: (event, rowData: RowData) => {
                  setModalConfirmation(true);
                  setModalConfTitle('Alerta de Exclusão');
                  setModalConfMsg(
                    <span>
                      Deseja remover permanentemente o formulário &quot;
                      <span style={{ fontWeight: 'bold' }}>
                        {rowData.title}
                      </span>
                      &quot;?
                    </span>,
                  );
                  setModalConfActTxt('Remover');
                  setFormId(rowData.id);
                },
              },
              {
                icon: () => <Refresh />,
                tooltip: 'Atualizar',
                isFreeAction: true,
                onClick: () => tableRef.current.onQueryChange(),
              },
            ]}
            options={{
              headerStyle: {
                backgroundColor: '#42a5f5',
                color: '#fff',
              },
              actionsCellStyle: {
                width: '8%',
              },
              actionsColumnIndex: -1,
              sorting: false,
            }}
          />
        </div>

        <ModalConfirmation
          open={modalConfirmation}
          close={handleModalClose}
          confirmAction={handleConfirmAction}
          title={modalConfTitle}
          msg={modalConfMsg || ''}
          cancel="Cancelar"
          confirm={modalConfActTxt}
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

export default Forms;
