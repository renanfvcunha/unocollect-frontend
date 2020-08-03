import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  ThemeProvider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Tooltip,
  Fab,
} from '@material-ui/core';
import { ArrowBack, Add, Remove } from '@material-ui/icons';
import { ApplicationState } from '../../../store';
import * as PageTitleActions from '../../../store/modules/pageTitle/actions';
import { useStyles, BtnStyle, Tooltips, BlueTextField } from './styles';

interface Fields {
  name: string;
  description?: string;
}

const NewForm: React.FC = () => {
  const classes = useStyles();
  const pageTitle = 'Formulários > Novo Formulário';
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);

  const [fields, setFields] = useState<Fields[]>([]);
  const [fieldsLength, setFieldsLength] = useState(1);

  useEffect(() => {
    dispatch(PageTitleActions.default(pageTitle));
  }, [dispatch]);

  function handleAddField() {
    setFieldsLength(fieldsLength + 1);
  }

  function handleRemoveField(i: number, fds: Fields[]) {
    fds.splice(i, 1);

    setFieldsLength(fieldsLength - 1);
  }

  function handleChangeFieldName(
    i: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const newFields = [...fields];

    const field = {
      ...newFields[i],
      name: e.target.value,
    };

    newFields[i] = field;

    setFields(newFields);
  }

  function handleChangeFieldDesc(
    i: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const newFields = [...fields];

    const field = {
      ...newFields[i],
      description: e.target.value,
    };

    newFields[i] = field;

    setFields(newFields);
  }

  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(Number(e.target.value));
  }

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
            <BlueTextField
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

            <BlueTextField
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const FormData = { title, description, category, fields };

    // eslint-disable-next-line no-console
    console.log(FormData);
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Link to="/forms" style={{ position: 'absolute' }}>
        <ThemeProvider theme={BtnStyle}>
          <Button variant="contained" color="primary">
            <ArrowBack className={classes.iconBack} />
            Voltar
          </Button>
        </ThemeProvider>
      </Link>

      <div className={classes.form}>
        <form className={classes.formBox} onSubmit={handleSubmit}>
          <Typography variant="h5" className={classes.title} align="center">
            Novo Formulário
          </Typography>

          <div className={classes.mainForm}>
            <BlueTextField
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
                <MenuItem value={1}>Visitas</MenuItem>
                <MenuItem value={2}>Outros</MenuItem>
              </Select>
            </FormControl>

            <BlueTextField
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
              <ThemeProvider theme={BtnStyle}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  type="submit"
                >
                  Adicionar Formulário
                </Button>
              </ThemeProvider>
            </FormControl>
          </div>
        </form>
      </div>
    </main>
  );
};

export default connect((state: ApplicationState) => ({
  title: state.pageTitle.title
}))(NewForm);
