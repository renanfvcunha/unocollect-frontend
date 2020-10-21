import React, {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
} from 'react';
import { useHistory } from 'react-router-dom';
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
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
} from '@material-ui/core';
import { ArrowBack, Add, Remove } from '@material-ui/icons';

import { ApplicationState } from '../../../store';
import setPageTitle from '../../../store/modules/pageTitle/actions';
import { getCategoriesRequest } from '../../../store/modules/categories/actions';
import { getGroupsRequest } from '../../../store/modules/groups/actions';
import {
  addFormRequest,
  setErrorFalse,
} from '../../../store/modules/forms/actions';
import { Field } from '../../../store/modules/forms/types';
import { checkTokenRequest, logout } from '../../../store/modules/auth/actions';
import { useStyles, BtnStyle, Tooltips } from './styles';
import ModalAlert from '../../../components/ModalAlert';

interface UserGroupsChecked {
  checked: boolean;
}

const NewForm: React.FC = () => {
  const classes = useStyles();
  const pageTitle = 'Formulários > Novo Formulário';
  const dispatch = useDispatch();
  const history = useHistory();

  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );

  const categories = useSelector(
    (state: ApplicationState) => state.categories.categories,
  );
  const groups = useSelector((state: ApplicationState) => state.groups.groups);

  const loading = useSelector((state: ApplicationState) => state.forms.loading);
  const success = useSelector((state: ApplicationState) => state.forms.success);
  const error = useSelector((state: ApplicationState) => state.forms.error);
  const modalMsg = useSelector(
    (state: ApplicationState) => state.forms.modalMsg,
  );
  const modalTitle = useSelector(
    (state: ApplicationState) => state.forms.modalTitle,
  );

  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);
  const [formGroups, setFormGroups] = useState<number[]>([]);
  const [formGroupsChecked, setFormGroupsChecked] = useState<
    UserGroupsChecked[]
  >([]);
  const [fields, setFields] = useState<Field[]>([
    {
      name: '',
      description: '',
      type: 'text',
      required: false,
      options: [''],
    },
  ]);

  const navBack = useCallback(() => {
    if (success && !modalOpen) {
      history.go(-1);
    }
  }, [success, modalOpen, history]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(Number(e.target.value));
  };

  const handleCheckGroup = (
    e: ChangeEvent<HTMLInputElement>,
    groupId: number,
    i: number,
  ) => {
    const formGroupsAux = formGroups;
    const formGroupsToCheck = [...formGroupsChecked];

    const groupExists = formGroupsAux.find(group => group === groupId);

    if (groupExists) {
      const groupToRemove = formGroupsAux.findIndex(group => group === groupId);
      formGroupsAux.splice(groupToRemove, 1);
    } else {
      formGroupsAux.push(groupId);
    }

    const newCheck = {
      checked: e.target.checked,
    };

    formGroupsToCheck[i] = newCheck;

    setFormGroups(formGroupsAux);
    setFormGroupsChecked(formGroupsToCheck);
  };

  const handleAddField = () => {
    const newField = [...fields];
    newField.push({
      name: '',
      description: '',
      type: 'text',
      required: false,
      options: [''],
    });

    setFields(newField);
  };

  const handleRemoveField = (i: number) => {
    const rmField = [...fields];
    rmField.splice(i, 1);

    setFields(rmField);
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

  const handleChangeFieldType = (
    i: number,
    e: ChangeEvent<{ value: unknown }>,
  ) => {
    const newFields = [...fields];

    const field = {
      ...newFields[i],
      type: String(e.target.value),
    };

    newFields[i] = field;

    setFields(newFields);
  };

  const handleChangeFieldRequired = (
    i: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const newFields = [...fields];

    const field = {
      ...newFields[i],
      required: e.target.checked,
    };

    newFields[i] = field;

    setFields(newFields);
  };

  const handleAddFieldOption = (i: number) => {
    const newFields = [...fields];
    const { options } = newFields[i];
    options.push('');

    const field = {
      ...newFields[i],
      options,
    };

    newFields[i] = field;

    setFields(newFields);
  };

  const handleChangeFieldOption = (
    i: number,
    j: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newFields = [...fields];
    const { options } = newFields[i];
    options[j] = e.target.value;

    const field = {
      ...newFields[i],
      options,
    };

    newFields[i] = field;

    setFields(newFields);
  };

  const handleRemoveFieldOption = (i: number, j: number) => {
    const newFields = [...fields];
    const { options } = newFields[i];
    options.splice(j, 1);

    const field = {
      ...newFields[i],
      options,
    };

    newFields[i] = field;

    setFields(newFields);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      category: {
        id: category === 0 ? null : category,
      },
      groups: formGroups,
      fields,
    };

    dispatch(addFormRequest(formData));
  };

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    dispatch(getCategoriesRequest());
    dispatch(getGroupsRequest());
  }, [dispatch]);

  useEffect(() => {
    const formGroupsToSet = groups.map(() => ({
      checked: false,
    }));
    setFormGroupsChecked(formGroupsToSet);
  }, [groups]);

  useEffect(() => {
    navBack();

    if (error) {
      setModalOpen(true);
      dispatch(setErrorFalse());
    }
  }, [navBack, error, dispatch]);

  return (
    <ThemeProvider theme={BtnStyle}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Button
          variant="contained"
          color="primary"
          style={{ position: 'absolute' }}
          onClick={() => history.go(-1)}
        >
          <ArrowBack className={classes.iconBack} />
          Voltar
        </Button>

        <div className={classes.form}>
          <div className={classes.formBox}>
            <Typography variant="h5" className={classes.title} align="center">
              Novo Formulário
            </Typography>

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

                <FormControl
                  component="fieldset"
                  className={classes.margin}
                  style={{ marginBottom: 0 }}
                >
                  <FormLabel component="legend">Grupos</FormLabel>
                  {groups ? (
                    <FormGroup className={classes.groupsBox}>
                      {groups.map((group, i) => (
                        <FormControlLabel
                          key={group.id}
                          control={
                            <Checkbox
                              name={String(group.id)}
                              color="primary"
                              checked={
                                formGroupsChecked[i]
                                  ? formGroupsChecked[i].checked
                                  : false
                              }
                              onChange={e => handleCheckGroup(e, group.id, i)}
                            />
                          }
                          label={group.name}
                        />
                      ))}
                    </FormGroup>
                  ) : (
                    <Typography>Não há grupos para exibir.</Typography>
                  )}
                </FormControl>
              </div>

              <Divider style={{ marginTop: 24 }} />

              <Typography variant="h6" className={classes.title} align="center">
                Campos
              </Typography>

              {fields.map((field, i) => (
                <div key={i}>
                  {/* Button Add Field */}
                  <div className={classes.fieldsForm}>
                    {i === fields.length - 1 ? (
                      <ThemeProvider theme={Tooltips}>
                        <Tooltip
                          title="Adicionar Campo"
                          aria-label="add"
                          style={{ marginRight: '2.5%', marginTop: '7.5%' }}
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
                          style={{
                            marginRight: '2.5%',
                            marginTop: '7.5%',
                            visibility: 'hidden',
                          }}
                        >
                          <Fab color="primary" size="small">
                            <Add />
                          </Fab>
                        </Tooltip>
                      </ThemeProvider>
                    )}

                    <div className={classes.fieldsFormFields}>
                      {/* Field Name */}
                      <TextField
                        type="text"
                        name="name"
                        label={`Campo ${i + 1}`}
                        required
                        className={classes.margin}
                        fullWidth
                        size="small"
                        value={field.name}
                        onChange={e => handleChangeFieldName(i, e)}
                      />

                      {/* Field Description */}
                      <TextField
                        type="text"
                        name="name"
                        label="Descrição (opcional)"
                        multiline
                        className={classes.margin}
                        fullWidth
                        size="small"
                        value={field.description}
                        onChange={e => handleChangeFieldDesc(i, e)}
                      />

                      <div className={classes.fieldsFormExtra}>
                        {/* Field Type */}
                        <FormControl className={classes.margin}>
                          <InputLabel id="type">Tipo</InputLabel>
                          <Select
                            labelId="type"
                            value={field.type}
                            onChange={e => handleChangeFieldType(i, e)}
                          >
                            <MenuItem value="text">Texto / Numérico</MenuItem>
                            <MenuItem value="radio">
                              Múltipla Escolha (Uma Opção)
                            </MenuItem>
                            <MenuItem value="checkbox">
                              Múltipla Escolha (Várias Opções)
                            </MenuItem>
                          </Select>
                        </FormControl>

                        {/* Required */}
                        <FormControlLabel
                          className={classes.margin}
                          control={
                            <Checkbox
                              checked={field.required}
                              onChange={e => handleChangeFieldRequired(i, e)}
                              name="required"
                              color="primary"
                            />
                          }
                          label="Obrigatório"
                        />
                      </div>

                      {field.type === 'radio' || field.type === 'checkbox' ? (
                        field.options.map((option, j) => (
                          <div key={j} className={classes.fieldsFormOptions}>
                            {/* Button Add Option */}
                            {j === fields[i].options.length - 1 ? (
                              <ThemeProvider theme={Tooltips}>
                                <Tooltip
                                  title="Adicionar Opção"
                                  aria-label="add"
                                  style={{ marginRight: '2.5%' }}
                                  onClick={() => handleAddFieldOption(i)}
                                >
                                  <Fab color="primary" size="small">
                                    <Add />
                                  </Fab>
                                </Tooltip>
                              </ThemeProvider>
                            ) : (
                              <ThemeProvider theme={Tooltips}>
                                <Tooltip
                                  title="Adicionar Opção"
                                  aria-label="add"
                                  style={{
                                    marginRight: '2.5%',
                                    visibility: 'hidden',
                                  }}
                                >
                                  <Fab color="primary" size="small">
                                    <Add />
                                  </Fab>
                                </Tooltip>
                              </ThemeProvider>
                            )}

                            <TextField
                              type="text"
                              name="option"
                              label={`Opção ${j + 1}`}
                              className={classes.margin}
                              size="small"
                              value={option}
                              onChange={e => handleChangeFieldOption(i, j, e)}
                            />

                            {/* Button Remove Option */}
                            {j === 0 && fields[i].options.length === 1 ? (
                              <ThemeProvider theme={Tooltips}>
                                <Tooltip
                                  title="Remover Opção"
                                  aria-label="remove"
                                  style={{
                                    marginLeft: '2.5%',
                                    visibility: 'hidden',
                                  }}
                                >
                                  <Fab color="secondary" size="small">
                                    <Remove />
                                  </Fab>
                                </Tooltip>
                              </ThemeProvider>
                            ) : (
                              <ThemeProvider theme={Tooltips}>
                                <Tooltip
                                  title="Remover Opção"
                                  aria-label="remove"
                                  style={{ marginLeft: '2.5%' }}
                                  onClick={() => handleRemoveFieldOption(i, j)}
                                >
                                  <Fab color="secondary" size="small">
                                    <Remove />
                                  </Fab>
                                </Tooltip>
                              </ThemeProvider>
                            )}
                          </div>
                        ))
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Button Remove Field */}
                    {i === 0 && fields.length === 1 ? (
                      <ThemeProvider theme={Tooltips}>
                        <Tooltip
                          title="Remover Campo"
                          aria-label="remove"
                          style={{
                            marginLeft: '2.5%',
                            marginTop: '7.5%',
                            visibility: 'hidden',
                          }}
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
                          style={{ marginLeft: '2.5%', marginTop: '7.5%' }}
                          onClick={() => handleRemoveField(i)}
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
                </div>
              ))}

              {loading ? (
                <div className={classes.progress}>
                  <CircularProgress />
                </div>
              ) : (
                ''
              )}

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
