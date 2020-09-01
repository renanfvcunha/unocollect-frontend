import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ThemeProvider,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Tooltip,
  Fab,
} from '@material-ui/core';
import { ArrowBack, Add, Remove, Close } from '@material-ui/icons';

import { ApplicationState } from '../../../store';
import setPageTitle from '../../../store/modules/pageTitle/actions';
import {
  getCategoriesRequest,
  addCategoryRequest,
  setErrorFalse,
} from '../../../store/modules/categories/actions';
import { addFormRequest } from '../../../store/modules/forms/actions';
import { useStyles, BtnStyle, Tooltips } from './styles';
import ModalAlert from '../../../components/ModalAlert';

interface Fields {
  name: string;
  description?: string;
}

const NewForm: React.FC = () => {
  const classes = useStyles();
  const pageTitle = 'Formulários > Novo Formulário';
  const dispatch = useDispatch();

  const categories = useSelector(
    (state: ApplicationState) => state.categories.categories,
  );
  const loading = useSelector(
    (state: ApplicationState) => state.categories.loading,
  );
  const success = useSelector(
    (state: ApplicationState) => state.categories.success,
  );
  const error = useSelector(
    (state: ApplicationState) => state.categories.error,
  );
  const modalMsg = useSelector(
    (state: ApplicationState) => state.categories.modalMsg,
  );
  const modalTitle = useSelector(
    (state: ApplicationState) => state.categories.modalTitle,
  );

  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);
  const [fields, setFields] = useState<Fields[]>([]);
  const [fieldsLength, setFieldsLength] = useState(1);

  const [showAddCat, setShowAddCat] = useState(false);
  const [catName, setCatName] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAddField = () => {
    setFieldsLength(fieldsLength + 1);
  };

  const handleRemoveField = (i: number, fds: Fields[]) => {
    fds.splice(i, 1);

    setFieldsLength(fieldsLength - 1);
  };

  const handleChangeFieldName = (
    i: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newFields = [...fields];

    const field = {
      ...newFields[i],
      name: e.target.value,
    };

    newFields[i] = field;

    setFields(newFields);
  };

  const handleChangeFieldDesc = (
    i: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newFields = [...fields];

    const field = {
      ...newFields[i],
      description: e.target.value,
    };

    newFields[i] = field;

    setFields(newFields);
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(Number(e.target.value));
  };

  const fieldsForm = [];
  for (let i = 0; i < fieldsLength; i += 1) {
    fields.push({
      name: '',
      description: '',
    });
    fieldsForm.push(
      <div key={i}>
        <div className={classes.fieldsForm}>
          {i === fieldsLength - 1 ? (
            <ThemeProvider theme={Tooltips}>
              <Tooltip
                title="Adicionar Campo"
                aria-label="add"
                style={{ marginRight: '2.5%' }}
                onClick={handleAddField}
              >
                <Fab color="primary" size="small">
                  <Add />
                </Fab>
              </Tooltip>
            </ThemeProvider>
          ) : (
            <ThemeProvider theme={Tooltips}>
              <Tooltip
                title="Adicionar Campo"
                aria-label="add"
                style={{ marginRight: '2.5%', visibility: 'hidden' }}
                onClick={handleAddField}
              >
                <Fab color="primary" size="small">
                  <Add />
                </Fab>
              </Tooltip>
            </ThemeProvider>
          )}

          <div className={classes.fieldsFormFields}>
            <TextField
              type="text"
              name="name"
              label={`Campo ${i + 1}`}
              required
              className={classes.margin}
              fullWidth
              size="small"
              value={fields[i].name}
              onChange={e => handleChangeFieldName(i, e)}
            />

            <TextField
              type="text"
              name="name"
              label="Descrição (opcional)"
              multiline
              className={classes.margin}
              fullWidth
              size="small"
              value={fields[i].description}
              onChange={e => handleChangeFieldDesc(i, e)}
            />
          </div>

          {i === 0 && fieldsLength === 1 ? (
            <ThemeProvider theme={Tooltips}>
              <Tooltip
                title="Remover Campo"
                aria-label="remove"
                style={{ marginLeft: '2.5%', visibility: 'hidden' }}
                onClick={() => handleRemoveField(i, fields)}
              >
                <Fab color="secondary" size="small">
                  <Remove />
                </Fab>
              </Tooltip>
            </ThemeProvider>
          ) : (
            <ThemeProvider theme={Tooltips}>
              <Tooltip
                title="Remover Campo"
                aria-label="remove"
                style={{ marginLeft: '2.5%' }}
                onClick={() => handleRemoveField(i, fields)}
              >
                <Fab color="secondary" size="small">
                  <Remove />
                </Fab>
              </Tooltip>
            </ThemeProvider>
          )}
        </div>

        <div className={classes.fieldsDivider}>
          <Divider style={{ width: '75%' }} />,
        </div>
      </div>,
    );
    fields.splice(fieldsLength);
  }

  const handleAddCategory = (e: FormEvent) => {
    e.preventDefault();

    dispatch(addCategoryRequest(catName));
    dispatch(getCategoriesRequest());
    setShowAddCat(false);
    setCatName('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const FormData = {
      title,
      description,
      category: {
        id: category === 0 ? null : category,
      },
      fields,
    };

    dispatch(addFormRequest(FormData));
  };

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));

    dispatch(getCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (error || success) {
      setModalOpen(true);

      dispatch(setErrorFalse());
    }
  }, [error, success, dispatch]);

  return (
    <ThemeProvider theme={BtnStyle}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Link to="/forms" style={{ position: 'absolute' }}>
          <Button variant="contained" color="primary">
            <ArrowBack className={classes.iconBack} />
            Voltar
          </Button>
        </Link>

        <div className={classes.form}>
          <div className={classes.formBox}>
            <Typography variant="h5" className={classes.title} align="center">
              Novo Formulário
            </Typography>

            {showAddCat ? (
              <form className={classes.addCatForm} onSubmit={handleAddCategory}>
                <TextField
                  type="text"
                  name="name"
                  label="Nome da Categoria"
                  style={{ width: '20%' }}
                  required
                  className={classes.margin}
                  value={catName}
                  onChange={e => setCatName(e.target.value)}
                />
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  style={{ padding: 8 }}
                  type="submit"
                >
                  Adicionar
                </Button>
              </form>
            ) : (
              <div />
            )}

            <form onSubmit={handleSubmit}>
              <div className={classes.mainForm}>
                <TextField
                  type="text"
                  name="name"
                  label="Nome do Formulário"
                  style={{ width: '50%' }}
                  required
                  className={classes.margin}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />

                <FormControl className={classes.margin}>
                  <InputLabel id="category">Categoria</InputLabel>
                  <Select
                    labelId="category"
                    value={category}
                    onChange={handleChangeCategory}
                  >
                    <MenuItem value={0}>Sem Categoria</MenuItem>
                    {categories?.map(cat => {
                      if (cat.id && cat.id !== null) {
                        return (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        );
                      }
                      return <MenuItem />;
                    })}
                  </Select>
                </FormControl>

                {showAddCat ? (
                  <ThemeProvider theme={Tooltips}>
                    <Tooltip
                      title="Cancelar"
                      aria-label="cancel"
                      style={{ marginRight: '2.5%' }}
                      onClick={() => setShowAddCat(false)}
                    >
                      <Fab color="secondary" size="small">
                        <Close />
                      </Fab>
                    </Tooltip>
                  </ThemeProvider>
                ) : (
                  <ThemeProvider theme={Tooltips}>
                    <Tooltip
                      title="Adicionar Categoria"
                      aria-label="addCat"
                      style={{ marginRight: '2.5%' }}
                      onClick={() => setShowAddCat(true)}
                    >
                      <Fab color="primary" size="small">
                        <Add />
                      </Fab>
                    </Tooltip>
                  </ThemeProvider>
                )}

                <TextField
                  type="text"
                  name="description"
                  label="Descrição (opcional)"
                  multiline
                  style={{ width: '75%' }}
                  className={classes.margin}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <Divider style={{ marginTop: 24 }} />

              <Typography variant="h6" className={classes.title} align="center">
                Campos
              </Typography>

              {fieldsForm}

              <div className={classes.subButton}>
                <FormControl style={{ width: '50%' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    type="submit"
                  >
                    Adicionar Formulário
                  </Button>
                </FormControl>
              </div>
            </form>
          </div>
        </div>
        <ModalAlert
          open={modalOpen}
          close={handleModalClose}
          title={modalTitle}
          msg={modalMsg}
        />
      </main>
    </ThemeProvider>
  );
};

export default NewForm;
