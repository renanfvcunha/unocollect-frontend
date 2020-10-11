import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  ThemeProvider,
  Tooltip,
  Fab,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { Add, Edit, Delete, Close, Done } from '@material-ui/icons';

import setPageTitle from '../../store/modules/pageTitle/actions';
import { ApplicationState } from '../../store';
import { checkTokenRequest, logout } from '../../store/modules/auth/actions';
import {
  getGroupsRequest,
  addGroupRequest,
  updateGroupRequest,
  deleteGroupRequest,
  setErrorFalse,
} from '../../store/modules/groups/actions';
import { useStyles, theme, btnActions, btnAction } from './styles';
import ModalConfirmation from '../../components/ModalConfirmation';
import ModalAlert from '../../components/ModalAlert';

const Groups: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = 'Grupos';

  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );

  const groups = useSelector((state: ApplicationState) => state.groups.groups);
  const success = useSelector(
    (state: ApplicationState) => state.groups.success,
  );
  const error = useSelector((state: ApplicationState) => state.groups.error);
  const modalTitle = useSelector(
    (state: ApplicationState) => state.groups.modalTitle,
  );
  const modalMsg = useSelector(
    (state: ApplicationState) => state.groups.modalMsg,
  );
  const loading = useSelector(
    (state: ApplicationState) => state.groups.loading,
  );

  const [showAddGroup, setShowAddGroup] = useState(false);
  const [groupNameToAdd, setGroupNameToAdd] = useState('');
  const [showEditGroup, setShowEditGroup] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(0);
  const [groupNameToEdit, setGroupNameToEdit] = useState('');
  const [groupToRemove, setGroupToRemove] = useState(0);
  const [groupNameToRemove, setGroupNameToRemove] = useState('');
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);

  const handleModalClose = () => {
    setModalConfirmation(false);
    setModalAlert(false);
  };

  const handleConfirmAction = () => {
    setModalConfirmation(false);
    dispatch(deleteGroupRequest(groupToRemove));
  };

  const handleAddGroup = () => {
    dispatch(addGroupRequest(groupNameToAdd));
  };

  const handleEditGroup = () => {
    dispatch(updateGroupRequest(groupToEdit, groupNameToEdit));
  };

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    dispatch(setPageTitle(title));
    dispatch(getGroupsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(getGroupsRequest());
      setShowAddGroup(false);
      setShowEditGroup(false);
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

        <Box className={classes.group}>
          <Box className={classes.groupBox}>
            <Typography
              align="center"
              component="h1"
              variant="h4"
              color="primary"
              className={classes.title}
            >
              Grupos
              <ThemeProvider theme={btnAction}>
                <Tooltip
                  title="Adicionar Grupo"
                  aria-label="addGroup"
                  className={classes.addGroupBtn}
                  onClick={() => {
                    setShowAddGroup(true);
                    if (showEditGroup) {
                      setShowEditGroup(false);
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
              {groups.length !== 0 ? (
                groups.map(group => (
                  <Box key={group.id} className={classes.groupNameWithActions}>
                    <ThemeProvider theme={btnActions}>
                      <Tooltip
                        title="Editar Grupo"
                        aria-label="edit"
                        onClick={() => {
                          setGroupToEdit(group.id);
                          setGroupNameToEdit(group.name);
                          setShowEditGroup(true);
                          if (showAddGroup) {
                            setShowAddGroup(false);
                          }
                        }}
                      >
                        <Fab color="primary" size="small">
                          <Edit />
                        </Fab>
                      </Tooltip>
                      <Typography className={classes.groupName}>
                        {group.name}
                      </Typography>
                      <Tooltip
                        title="Remover Grupo"
                        aria-label="remove"
                        onClick={() => {
                          setModalConfirmation(true);
                          setGroupToRemove(group.id);
                          setGroupNameToRemove(group.name);
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
                <Typography>Ainda não há grupos cadastrados.</Typography>
              )}

              {showAddGroup ? (
                <Box className={classes.addGroup}>
                  <ThemeProvider theme={btnAction}>
                    <Tooltip
                      title="Cancelar"
                      aria-label="cancel"
                      onClick={() => setShowAddGroup(false)}
                    >
                      <Fab color="secondary" size="small">
                        <Close />
                      </Fab>
                    </Tooltip>
                  </ThemeProvider>
                  <TextField
                    type="text"
                    name="name"
                    label="Adicionar Grupo"
                    className={classes.margin}
                    value={groupNameToAdd}
                    onChange={e => setGroupNameToAdd(e.target.value)}
                  />
                  <ThemeProvider theme={btnAction}>
                    <Tooltip
                      title="Adicionar"
                      aria-label="add"
                      onClick={() => handleAddGroup()}
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

              {showEditGroup ? (
                <Box className={classes.addGroup}>
                  <ThemeProvider theme={btnAction}>
                    <Tooltip
                      title="Cancelar"
                      aria-label="cancel"
                      onClick={() => setShowEditGroup(false)}
                    >
                      <Fab color="secondary" size="small">
                        <Close />
                      </Fab>
                    </Tooltip>
                  </ThemeProvider>
                  <TextField
                    type="text"
                    name="name"
                    label="Editar Grupo"
                    className={classes.margin}
                    value={groupNameToEdit}
                    onChange={e => setGroupNameToEdit(e.target.value)}
                  />
                  <ThemeProvider theme={btnAction}>
                    <Tooltip
                      title="Salvar"
                      aria-label="add"
                      onClick={() => handleEditGroup()}
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
          msg={`Deseja remover o grupo "${groupNameToRemove}"?`}
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

export default Groups;
