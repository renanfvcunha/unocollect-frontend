import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  ThemeProvider,
  Tooltip,
  Fab,
  TextField,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { Add, Edit, Delete, Close, Done, ArrowBack } from '@material-ui/icons';

import setPageTitle from '../../../store/modules/pageTitle/actions';
import { ApplicationState } from '../../../store';
import { checkTokenRequest, logout } from '../../../store/modules/auth/actions';
import {
  getCategoriesRequest,
  addCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
  setErrorFalse,
} from '../../../store/modules/categories/actions';
import { useStyles, theme, btnActions, btnAction } from './styles';
import ModalConfirmation from '../../../components/ModalConfirmation';
import ModalAlert from '../../../components/ModalAlert';

const Categories: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const addCatRef = useRef<HTMLInputElement>(null);
  const editCatRef = useRef<HTMLInputElement>(null);
  const title = 'Formulários > Categorias';
  const history = useHistory();

  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );

  const categories = useSelector(
    (state: ApplicationState) => state.categories.categories,
  );
  const success = useSelector(
    (state: ApplicationState) => state.categories.success,
  );
  const error = useSelector(
    (state: ApplicationState) => state.categories.error,
  );
  const modalTitle = useSelector(
    (state: ApplicationState) => state.categories.modalTitle,
  );
  const modalMsg = useSelector(
    (state: ApplicationState) => state.categories.modalMsg,
  );
  const loading = useSelector(
    (state: ApplicationState) => state.categories.loading,
  );

  const [showAddCat, setShowAddCat] = useState(false);
  const [catNameToAdd, setCatNameToAdd] = useState('');
  const [showEditCat, setShowEditCat] = useState(false);
  const [catToEdit, setCatToEdit] = useState(0);
  const [catNameToEdit, setCatNameToEdit] = useState('');
  const [catToRemove, setCatToRemove] = useState(0);
  const [catNameToRemove, setCatNameToRemove] = useState('');
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);

  const handleModalClose = () => {
    setModalConfirmation(false);
    setModalAlert(false);
  };

  const handleConfirmAction = () => {
    setModalConfirmation(false);
    dispatch(deleteCategoryRequest(catToRemove));
  };

  const handleAddCategory = () => {
    dispatch(addCategoryRequest(catNameToAdd));
  };

  const handleEditCategory = () => {
    dispatch(updateCategoryRequest(catToEdit, catNameToEdit));
  };

  useLayoutEffect(() => {
    if (showAddCat && addCatRef.current !== null) {
      addCatRef.current.focus();
    }

    if (showEditCat && editCatRef.current !== null) {
      editCatRef.current.focus();
    }
  }, [showAddCat, showEditCat]);

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    dispatch(setPageTitle(title));
    dispatch(getCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(getCategoriesRequest());
      setShowAddCat(false);
      setShowEditCat(false);
    }

    if (error) {
      setModalAlert(true);
      dispatch(setErrorFalse());
    }
  }, [success, error, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Button
          variant="contained"
          color="primary"
          style={{ position: 'absolute' }}
          onClick={() => history.go(-1)}
        >
          <ArrowBack style={{ marginRight: 8 }} />
          Voltar
        </Button>

        <Box className={classes.group}>
          <Box className={classes.groupBox}>
            <Typography
              align="center"
              component="h1"
              variant="h4"
              color="primary"
              className={classes.title}
            >
              Categorias
              <ThemeProvider theme={btnAction}>
                <Tooltip
                  title="Adicionar Categoria"
                  aria-label="addCategory"
                  className={classes.addGroupBtn}
                  onClick={() => {
                    setShowAddCat(true);
                    if (showEditCat) {
                      setShowEditCat(false);
                    }
                  }}
                >
                  <Fab color="primary" size="small">
                    <Add />
                  </Fab>
                </Tooltip>
              </ThemeProvider>
            </Typography>

            <Box className={classes.groups}>
              {categories.length !== 0 ? (
                categories.map(cat => (
                  <Box
                    key={Number(cat.id)}
                    className={classes.groupNameWithActions}
                  >
                    <ThemeProvider theme={btnActions}>
                      <Tooltip
                        title="Editar Categoria"
                        aria-label="edit"
                        onClick={() => {
                          setCatToEdit(Number(cat.id));
                          setCatNameToEdit(String(cat.name));
                          setShowEditCat(true);
                          if (showAddCat) {
                            setShowAddCat(false);
                          }
                        }}
                      >
                        <Fab color="primary" size="small">
                          <Edit />
                        </Fab>
                      </Tooltip>
                      <Typography className={classes.groupName}>
                        {cat.name}
                      </Typography>
                      <Tooltip
                        title="Remover Categoria"
                        aria-label="remove"
                        onClick={() => {
                          setModalConfirmation(true);
                          setCatToRemove(Number(cat.id));
                          setCatNameToRemove(String(cat.name));
                        }}
                      >
                        <Fab color="secondary" size="small">
                          <Delete />
                        </Fab>
                      </Tooltip>
                    </ThemeProvider>
                  </Box>
                ))
              ) : (
                <Typography>Ainda não há categorias cadastradas.</Typography>
              )}

              {showAddCat ? (
                <Box className={classes.addGroup}>
                  <ThemeProvider theme={btnAction}>
                    <Tooltip
                      title="Cancelar"
                      aria-label="cancel"
                      onClick={() => setShowAddCat(false)}
                    >
                      <Fab color="secondary" size="small">
                        <Close />
                      </Fab>
                    </Tooltip>
                  </ThemeProvider>
                  <TextField
                    inputRef={addCatRef}
                    type="text"
                    name="name"
                    label="Adicionar Categoria"
                    className={classes.margin}
                    value={catNameToAdd}
                    onChange={e => setCatNameToAdd(e.target.value)}
                  />
                  <ThemeProvider theme={btnAction}>
                    <Tooltip
                      title="Adicionar"
                      aria-label="add"
                      onClick={() => handleAddCategory()}
                    >
                      <Fab color="primary" size="small">
                        <Done />
                      </Fab>
                    </Tooltip>
                  </ThemeProvider>
                </Box>
              ) : (
                <Box />
              )}

              {showEditCat ? (
                <Box className={classes.addGroup}>
                  <ThemeProvider theme={btnAction}>
                    <Tooltip
                      title="Cancelar"
                      aria-label="cancel"
                      onClick={() => setShowEditCat(false)}
                    >
                      <Fab color="secondary" size="small">
                        <Close />
                      </Fab>
                    </Tooltip>
                  </ThemeProvider>
                  <TextField
                    inputRef={editCatRef}
                    type="text"
                    name="name"
                    label="Editar Categoria"
                    className={classes.margin}
                    value={catNameToEdit}
                    onChange={e => setCatNameToEdit(e.target.value)}
                  />
                  <ThemeProvider theme={btnAction}>
                    <Tooltip
                      title="Salvar"
                      aria-label="add"
                      onClick={() => handleEditCategory()}
                    >
                      <Fab color="primary" size="small">
                        <Done />
                      </Fab>
                    </Tooltip>
                  </ThemeProvider>
                </Box>
              ) : (
                <Box />
              )}

              {loading ? <CircularProgress size={32} /> : <Box />}
            </Box>
          </Box>
        </Box>

        <ModalConfirmation
          open={modalConfirmation}
          close={handleModalClose}
          confirmAction={handleConfirmAction}
          title="Alerta de Exclusão"
          msg={`Deseja remover a categoria "${catNameToRemove}"?`}
          cancel="Cancelar"
          confirm="Remover"
        />

        <ModalAlert
          open={modalAlert}
          close={handleModalClose}
          title={modalTitle}
          msg={modalMsg}
        />
      </main>
    </ThemeProvider>
  );
};

export default Categories;
