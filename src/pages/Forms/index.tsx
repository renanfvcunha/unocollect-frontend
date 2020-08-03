import React, { useState, useEffect, forwardRef } from 'react';
import { connect, useDispatch } from 'react-redux';
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
import { ApplicationState } from '../../store';
import * as PageTitleActions from '../../store/modules/pageTitle/actions';
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

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const classes = useStyles();
  const dispatch = useDispatch();
  const pageTitle = 'Formulários';

  useEffect(() => {
    dispatch(PageTitleActions.default(pageTitle));
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
          <Link to="/forms/new">
            <Button variant="contained" color="primary">
              <Assignment className={classes.iconAdd} />
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
                  title: 'Título do Formulário',
                  field: 'title',
                  type: 'string',
                  align: 'left',
                  headerStyle: {
                    width: 'calc(45% + 0px)',
                    maxWidth: 'calc(45% + 0px)',
                  },
                  cellStyle: {
                    width: 'calc(45% + 0px)',
                    maxWidth: 'calc(45% + 0px)',
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
                  type: 'numeric',
                  align: 'left',
                },
              ]}
              data={[
                {
                  id: 1,
                  title: 'Visita na estação de energia da Zona Sul',
                  category: 'Visitas',
                  fills: 15,
                },
                {
                  id: 2,
                  title:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure unde veritatis aut vitae voluptatibus quae asperiores odit laboriosam temporibus deserunt.',
                  category: 'Sem Categoria',
                  fills: 9,
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
                {
                  icon: () => <PostAdd />,
                  tooltip: 'Adicionar Preenchimento',
                  onClick: (event, rowData: IRowData) =>
                    history.push(`/fills/add/${rowData.id}`),
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

export default connect((state: ApplicationState) => ({
  title: state.pageTitle.title,
}))(Dashboard);
