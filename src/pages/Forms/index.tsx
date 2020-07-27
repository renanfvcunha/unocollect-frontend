import React, { useEffect, forwardRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThemeProvider, Button } from '@material-ui/core';
import {
  PostAdd,
  Clear,
  ChevronRight,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  ArrowDownward,
} from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';
import * as PageTitleActions from '../../store/actions/pageTitle';
import { useStyles, Blue } from './styles';

interface PageTitle {
  pageTitle: {
    title?: string;
  };
}

/* interface IRowData {
  id: number;
  form: string;
  category: string;
  fills: number;
} */

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = 'Formulários';

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
          <Link to="/newform">
            <Button variant="contained" color="primary">
              <PostAdd className={classes.iconAdd} />
              Novo Formulário
            </Button>
          </Link>
        </ThemeProvider>

        <div className={classes.table}>
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
                title: 'Nome do Formulário',
                field: 'form',
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
                form: 'Visita na estação de energia da Zona Sul',
                category: 'Visitas',
                fills: 15,
              },
              {
                id: 2,
                form:
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
              pagination: {
                firstTooltip: 'Primeira Página',
                lastTooltip: 'Última Página',
                previousTooltip: 'Página Anterior',
                nextTooltip: 'Próxima Página',
                labelDisplayedRows: '{from}-{to} de {count}',
                labelRowsSelect: 'linhas',
              },
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default connect((state: PageTitle) => ({
  title: state.pageTitle.title,
}))(Dashboard);
