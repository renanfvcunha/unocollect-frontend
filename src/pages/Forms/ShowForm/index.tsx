import React, { useState, useEffect, forwardRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

import api from '../../../services/api';
import { ApplicationState } from '../../../store';
import setPageTitle from '../../../store/modules/pageTitle/actions';
import { getFormRequest } from '../../../store/modules/forms/actions';
import { useStyles, BtnStyle, TRow } from './styles';
import tron from '../../../config/ReactotronConfig';

/* interface TableColumns {
  title?: string;
  field?: string;
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
} */

const ShowForm: React.FC = () => {
  const { id } = useParams();
  const classes = useStyles();
  const pageTitle = 'Formulários > Visualizar Formulário';
  const dispatch = useDispatch();

  const formTitle = useSelector(
    (state: ApplicationState) => state.forms.form.title,
  );
  const fields = useSelector(
    (state: ApplicationState) => state.forms.form.fields,
  );

  // const [tableColumns, setTableColumns] = useState<TableColumns[]>([]);

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));

    dispatch(getFormRequest(id));
  }, [dispatch, id]);

  /* useEffect(() => {
    if (fields) {
      const columns = fields.map(field => ({
        title: field.name,
        field: String(field.id),
      }));
      const finalColumns = [
        ...columns,
        {
          title: 'Criado Por',
          field: 'created_by',
        },
        {
          title: 'Criado Em',
          field: 'created_at',
        },
      ];

      setTableColumns(finalColumns);
    }
  }, [fields]); */

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
            title={formTitle}
            columns={[
              {
                title: 'Campo',
                field: 'field',
                type: 'numeric',
                align: 'left',
              },
              {
                title: 'Valor',
                field: 'value',
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
                title: 'Criado em',
                field: 'created_at',
                type: 'datetime',
                align: 'left',
              },
            ]}
            data={query =>
              new Promise(resolve => {
                const url = `fills/${id}?per_page=${
                  query.pageSize
                }&page=${query.page + 1}&search=${query.search}`;
                api.get(url).then(response => {
                  resolve({
                    data: response.data.fills,
                    page: response.data.page - 1,
                    totalCount: response.data.totalCount,
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
