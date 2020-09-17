import React, {
  useState,
  useEffect,
  forwardRef,
  createRef,
  RefObject,
} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, Button, Typography } from '@material-ui/core';
import {
  ArrowBack,
  ArrowDownward,
  ChevronLeft,
  ChevronRight,
  Clear,
  FirstPage,
  LastPage,
  Refresh,
  SaveAlt,
  Search,
} from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';
import { AxiosResponse } from 'axios';
import { CSVLink } from 'react-csv';
import ModalImage from 'react-modal-image';

import api from '../../../services/api';
import { ApplicationState } from '../../../store';
import setPageTitle from '../../../store/modules/pageTitle/actions';
import { getFormRequest } from '../../../store/modules/forms/actions';
import { getUsersImagesRequest } from '../../../store/modules/images/actions';
import { useStyles, theme } from './styles';

interface TableColumns {
  title?: string;
  field?: string;
}

const ShowForm: React.FC = () => {
  const { id } = useParams();
  const classes = useStyles();
  const pageTitle = 'Formulários > Visualizar Formulário';
  const dispatch = useDispatch();
  const tableRef: RefObject<any> = createRef();

  const formTitle = useSelector(
    (state: ApplicationState) => state.forms.form.title,
  );
  const fields = useSelector(
    (state: ApplicationState) => state.forms.form.fields,
  );
  const usersImages = useSelector(
    (state: ApplicationState) => state.images.usersImages,
  );

  const [tableColumns, setTableColumns] = useState<TableColumns[]>([]);
  const [csvData, setCsvData] = useState<[string[]]>([[]]);

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    dispatch(getFormRequest(id));
    dispatch(getUsersImagesRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (fields) {
      const idColumn = [
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
      ];
      const columns = fields.map(field => ({
        title: field.name,
        field: String(field.id),
      }));
      const finalColumns = [
        ...idColumn,
        ...columns,
        {
          title: 'Criado Por',
          field: 'created_by',
        },
        {
          title: 'Criado Em',
          field: 'created_at',
          type: 'datetime',
        },
      ];

      setTableColumns(finalColumns);
    }
  }, [fields]);

  useEffect(() => {
    api
      .get(`/fills/export/${id}`)
      .then((response: AxiosResponse<[string[]]>) => {
        setCsvData(response.data);
      });
  }, [id]);

  const tableIcons: Icons = {
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
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
        <Link to="/forms">
          <Button variant="contained" color="primary">
            <ArrowBack className={classes.iconBack} />
            Voltar
          </Button>
        </Link>

        <div className={classes.table}>
          <MaterialTable
            title={formTitle}
            columns={tableColumns}
            tableRef={tableRef}
            data={query =>
              new Promise(resolve => {
                api
                  .get(
                    `fills/${id}/?per_page=${query.pageSize}&page=${query.page +
                      1}`,
                  )
                  .then(response => {
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
              header: {
                actions: 'Ações',
              },
              toolbar: {
                exportTitle: 'Exportar',
                exportAriaLabel: 'Exportar',
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
                icon: () => <Refresh />,
                tooltip: 'Atualizar',
                isFreeAction: true,
                onClick: () => {
                  tableRef.current.onQueryChange();
                  dispatch(getUsersImagesRequest(id));
                },
              },
            ]}
            options={{
              headerStyle: {
                backgroundColor: '#ab47bc',
                color: '#fff',
              },
              search: false,
              sorting: false,
            }}
          />
        </div>

        <div>
          <CSVLink data={csvData} style={{ float: 'right' }}>
            <Button color="primary" variant="contained">
              <SaveAlt style={{ marginRight: 8 }} />
              Baixar CSV
            </Button>
          </CSVLink>

          <Typography component="h1" variant="h4">
            Imagens
          </Typography>

          {usersImages.length !== 0 ? (
            usersImages.map(userImage =>
              userImage.images.length !== 0 ? (
                <div className={classes.imagesBox}>
                  <Typography component="h2" variant="h6">
                    {userImage.name} no preenchimento {userImage.id_user_form}
                  </Typography>

                  <div className={classes.images}>
                    {userImage.images.map(image => (
                      <div className={classes.imageThumb}>
                        <ModalImage
                          small={image}
                          large={image}
                          alt={image.split('/').pop()}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div />
              ),
            )
          ) : (
            <Typography component="h2" variant="subtitle1">
              Não há imagens enviadas neste formulário.
            </Typography>
          )}
        </div>
      </main>
    </ThemeProvider>
  );
};

export default ShowForm;
