import React, { useState, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ThemeProvider, Button } from '@material-ui/core';
import {
  Assignment,
  Clear,
  ChevronRight,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  ArrowDownward,
  Visibility,
  Delete,
} from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';

import api from '../../services/api';
import { ApplicationState } from '../../store';
import setPageTitle from '../../store/modules/pageTitle/actions';
import {
  deleteFormRequest,
  setErrorFalse,
} from '../../store/modules/forms/actions';
import ModalConfirmation from '../../components/ModalConfirmation';
import ModalAlert from '../../components/ModalAlert';
import { useStyles, BtnStyle, TRow } from './styles';

interface RowData {
  id: number;
  title: string;
  category?: string;
  fills: number;
}

const Forms: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const pageTitle = 'Formulários';

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
  const [formName, setFormName] = useState('');
  const [formToRemove, setFormToRemove] = useState(0);

  const handleModalClose = () => {
    setModalConfirmation(false);
    setModalAlert(false);
  };

  const handleRemoveForm = () => {
    setModalConfirmation(false);

    dispatch(deleteFormRequest(formToRemove));
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
    dispatch(setPageTitle(pageTitle));
  }, [dispatch]);

  useEffect(() => {
    if (error || success) {
      setModalAlert(true);

      dispatch(setErrorFalse());
    }
  }, [error, success, dispatch]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <div className="button">
        <ThemeProvider theme={BtnStyle}>
          <Link to="/forms/new">
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: 24 }}
            >
              <Assignment style={{ marginRight: 8 }} />
              Novo Formulário
            </Button>
          </Link>
        </ThemeProvider>

        <div className={classes.table}>
          <ThemeProvider theme={TRow}>
            <MaterialTable
              title="Lista de Formulários"
              columns={[
                {
                  title: 'Id',
                  field: 'id',
                  type: 'numeric',
                  align: 'left',
                },
                {
                  title: 'Título do Formulário',
                  field: 'title',
                  type: 'string',
                  align: 'left',
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
                  type: 'numeric',
                  align: 'left',
                },
                {
                  title: 'Criado Em',
                  field: 'created_at',
                  type: 'datetime',
                  align: 'left',
                },
              ]}
              data={query =>
                new Promise(resolve => {
                  const url = `forms?per_page=${
                    query.pageSize
                  }&page=${query.page + 1}&search=${query.search}`;
                  api.get(url).then(response => {
                    resolve({
                      data: response.data.forms,
                      page: response.data.page - 1,
                      totalCount: response.data.total,
                    });
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
                  tooltip: 'Visualizar Formulário',
                  onClick: (event, rowData: RowData) =>
                    history.push(`/forms/${rowData.id}`),
                },
                {
                  icon: () => <Delete />,
                  tooltip: 'Remover Formulário',
                  onClick: (event, rowData: RowData) => {
                    setModalConfirmation(true);
                    setFormName(rowData.title);
                    setFormToRemove(rowData.id);
                  },
                },
              ]}
              options={{
                headerStyle: {
                  backgroundColor: '#42a5f5',
                  color: '#fff',
                },
                actionsColumnIndex: -1,
              }}
            />
          </ThemeProvider>
        </div>
      </div>

      <ModalConfirmation
        open={modalConfirmation}
        close={handleModalClose}
        confirmAction={handleRemoveForm}
        name={formName}
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
  );
};

export default Forms;
