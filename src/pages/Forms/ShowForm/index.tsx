import React, { useEffect, forwardRef } from 'react';
import { /* useParams, */ Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { ThemeProvider, Button } from '@material-ui/core';
import {
  ArrowBack,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft,
  Clear,
  Search,
  ArrowDownward,
} from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';
import { ApplicationState } from '../../../store';
import setPageTitle from '../../../store/modules/pageTitle/actions';
import { useStyles, BtnStyle, TRow } from './styles';

const ShowForm: React.FC = () => {
  // const { id } = useParams();
  const classes = useStyles();
  const pageTitle = 'Formulários > Visualizar Formulário';
  const dispatch = useDispatch();

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
      <Link to="/forms">
        <ThemeProvider theme={BtnStyle}>
          <Button variant="contained" color="primary">
            <ArrowBack className={classes.iconBack} />
            Voltar
          </Button>
        </ThemeProvider>
      </Link>

      <div className={classes.table}>
        <ThemeProvider theme={TRow}>
          <MaterialTable
            title="Visita na estação de energia da Zona Sul"
            columns={[
              {
                title: 'Id',
                field: 'id',
                type: 'numeric',
                align: 'left',
              },
              {
                title: 'Campo 1',
                field: 'field1',
                type: 'string',
                align: 'left',
              },
              {
                title: 'Campo 2',
                field: 'field2',
                type: 'string',
                align: 'left',
              },
              {
                title: 'Campo 3',
                field: 'field3',
                type: 'string',
                align: 'left',
              },
              {
                title: 'Campo 4',
                field: 'field4',
                type: 'string',
                align: 'left',
              },
              {
                title: 'Criado Por',
                field: 'created_by',
                type: 'string',
                align: 'left',
              },
              {
                title: 'Criado Em',
                field: 'created_at',
                type: 'date',
                align: 'left',
              },
            ]}
            data={[
              {
                id: 1,
                field1: 'Resposta do campo 1',
                field2: 'Resposta do campo 2',
                field3: 'Resposta do campo 3',
                field4: 'Resposta do campo 4',
                created_by: 'Renan Cunha',
                created_at: '31/07/2020 17:11:35',
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
              headerStyle: {
                backgroundColor: '#ab47bc',
                color: '#fff',
              },
            }}
          />
        </ThemeProvider>
      </div>
    </main>
  );
};

export default ShowForm;
