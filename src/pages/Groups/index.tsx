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
  deleteGroupRequest,
} from '../../store/modules/groups/actions';
import { useStyles, theme, btnActions, btnAddGroup } from './styles';
import tron from '../../config/ReactotronConfig';

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
  const loading = useSelector(
    (state: ApplicationState) => state.groups.loading,
  );

  const [showAddGroup, setShowAddGroup] = useState(false);
  const [groupToAdd, setGroupToAdd] = useState('');

  const handleAddGroup = () => {
    dispatch(addGroupRequest(groupToAdd));
  };

  const handleDeleteGroup = (id: number) => {
    dispatch(deleteGroupRequest(id));
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
    }
  }, [success, dispatch]);

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
              <ThemeProvider theme={btnAddGroup}>
                <Tooltip
                  title="Adicionar Grupo"
                  aria-label="addGroup"
                  className={classes.addGroupBtn}
                  onClick={() => setShowAddGroup(true)}
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
                      <Tooltip title="Editar Grupo" aria-label="edit">
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
                        onClick={() => handleDeleteGroup(group.id)}
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
                  <ThemeProvider theme={btnAddGroup}>
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
                    label="Nome do Grupo"
                    className={classes.margin}
                    value={groupToAdd}
                    onChange={e => setGroupToAdd(e.target.value)}
                  />
                  <ThemeProvider theme={btnAddGroup}>
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
              {loading ? <CircularProgress size={32} /> : <Box />}
            </Box>
          </Box>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default Groups;
