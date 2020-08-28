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
import { ArrowBack, Refresh, SaveAlt } from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';
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

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    dispatch(getFormRequest(id));
    dispatch(getUsersImagesRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
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
          type: 'datetime',
        },
      ];

      setTableColumns(finalColumns);
    }
  }, [fields]);

  const tableIcons: Icons = {
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
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
                api.get(`fills/${id}`).then(response => {
                  resolve({
                    data: response.data,
                    page: 0,
                    totalCount: 0,
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
            }}
            actions={[
              {
                icon: () => <Refresh />,
                tooltip: 'Atualizar',
                isFreeAction: true,
                onClick: () => tableRef.current.onQueryChange(),
              },
            ]}
            options={{
              headerStyle: {
                backgroundColor: '#ab47bc',
                color: '#fff',
              },
              paging: false,
              search: false,
              sorting: false,
              exportButton: true,
            }}
          />
        </div>

        <div>
          <Typography component="h1" variant="h4">
            Imagens
          </Typography>

          {usersImages.map(userImage => (
            <div className={classes.imagesBox}>
              <Typography component="h2" variant="h6">
                {userImage.name}
              </Typography>
              <div className={classes.images}>
                {userImage.images ? (
                  userImage.images.map(image => (
                    <div className={classes.imageThumb}>
                      <ModalImage
                        small={image}
                        large={image}
                        alt={image.split('/').pop()}
                      />
                    </div>
                  ))
                ) : (
                  <div />
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </ThemeProvider>
  );
};

export default ShowForm;
