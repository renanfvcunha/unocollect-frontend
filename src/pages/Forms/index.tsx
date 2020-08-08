import React, { useState, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ThemeProvider, Button } from '@material-ui/core';
import {
  Assignment,
  PostAdd,
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
import ModalConfirmation from '../../components/ModalConfirmation';
import { useStyles, BtnStyle, TRow } from './styles';

interface IRowData {
  id: number;
  title: string;
  category?: string;
  fills: number;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const admin = useSelector((state: ApplicationState) => state.auth.user.admin);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const classes = useStyles();
  const dispatch = useDispatch();
  const pageTitle = 'Formulários';

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
        {admin ? (
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
        ) : (
          ''
        )}

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
                      page: 0,
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
                  onClick: (event, rowData: IRowData) =>
                    history.push(`/forms/${rowData.id}`),
                },
                {
                  icon: () => <Delete />,
                  tooltip: 'Remover Formulário',
                  onClick: (event, rowData: IRowData) => {
                    setModalOpen(true);
                    setName(rowData.title);
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
        open={modalOpen}
        close={handleModalClose}
        name={`o formulário "${name}"`}
        cancel="Cancelar"
        del="Remover"
      />
    </main>
  );
};

export default Dashboard;
