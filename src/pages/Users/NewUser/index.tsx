import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  ThemeProvider,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  RadioGroup,
  Radio,
  CircularProgress,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import { useStyles, theme } from './styles';
import { ApplicationState } from '../../../store';
import setPageTitle from '../../../store/modules/pageTitle/actions';
import {
  addUserRequest,
  setErrorFalse,
} from '../../../store/modules/users/actions';
import { getGroupsRequest } from '../../../store/modules/groups/actions';
import { checkTokenRequest, logout } from '../../../store/modules/auth/actions';
import ModalAlert from '../../../components/ModalAlert';

interface UserGroupsChecked {
  checked: boolean;
}

const NewUser: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageTitle = 'Usuários > Novo Usuário';
  const history = useHistory();

  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );

  const loading = useSelector((state: ApplicationState) => state.users.loading);
  const success = useSelector((state: ApplicationState) => state.users.success);
  const error = useSelector((state: ApplicationState) => state.users.error);
  const groups = useSelector((state: ApplicationState) => state.groups.groups);
  const modalMsg = useSelector(
    (state: ApplicationState) => state.users.modalMsg,
  );
  const modalTitle = useSelector(
    (state: ApplicationState) => state.users.modalTitle,
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [admin, setAdmin] = useState('0');
  const [userGroups, setUserGroups] = useState<number[]>([]);
  const [userGroupsChecked, setUserGroupsChecked] = useState<
    UserGroupsChecked[]
  >([]);
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const navBack = useCallback(() => {
    if (success && !modalOpen) {
      history.go(-1);
    }
  }, [success, modalOpen, history]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleChangeAdmin = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmin(e.target.value);
  };

  const handleCheckGroup = (
    e: ChangeEvent<HTMLInputElement>,
    groupId: number,
    i: number,
  ) => {
    const userGroupsAux = userGroups;
    const userGroupsToCheck = [...userGroupsChecked];

    const groupExists = userGroupsAux.find(group => group === groupId);

    if (groupExists) {
      const groupToRemove = userGroupsAux.findIndex(group => group === groupId);
      userGroupsAux.splice(groupToRemove, 1);
    } else {
      userGroupsAux.push(groupId);
    }

    const newCheck = {
      checked: e.target.checked,
    };

    userGroupsToCheck[i] = newCheck;

    setUserGroups(userGroupsAux);
    setUserGroupsChecked(userGroupsToCheck);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      username,
      admin: admin === '1',
      groups: userGroups,
      password,
      passwordConf,
    };

    dispatch(addUserRequest(data));
  };

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    dispatch(getGroupsRequest());
  }, [dispatch]);

  useEffect(() => {
    const userGroupsToSet = groups.map(() => ({
      checked: false,
    }));
    setUserGroupsChecked(userGroupsToSet);
  }, [groups]);

  useEffect(() => {
    navBack();

    if (error) {
      setModalOpen(true);

      dispatch(setErrorFalse());
    }
  }, [navBack, error, dispatch]);

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
          <ArrowBack className={classes.iconBack} />
          Voltar
        </Button>

        <div className={classes.form}>
          <form className={classes.formBox} onSubmit={handleSubmit}>
            <div className={classes.formRoot}>
              <Typography variant="h5" className={classes.title} align="center">
                Novo Usuário
              </Typography>

              <TextField
                label="Nome Completo"
                required
                className={classes.field}
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <TextField
                label="Nome de Usuário"
                required
                className={classes.field}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />

              <FormControl component="fieldset" className={classes.field}>
                <FormLabel component="legend">Admin</FormLabel>
                <RadioGroup value={admin} onChange={handleChangeAdmin}>
                  <div className={classes.radioButtons}>
                    <FormControlLabel
                      value="0"
                      control={<Radio color="primary" />}
                      label="Não"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label="Sim"
                    />
                  </div>
                </RadioGroup>
              </FormControl>

              <FormControl
                component="fieldset"
                className={classes.field}
                style={{ marginBottom: 0 }}
              >
                <FormLabel component="legend">Grupos</FormLabel>
                {groups ? (
                  <FormGroup>
                    {groups.map((group, i) => (
                      <FormControlLabel
                        key={group.id}
                        control={
                          <Checkbox
                            name={String(group.id)}
                            color="primary"
                            checked={
                              userGroupsChecked[i]
                                ? userGroupsChecked[i].checked
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

              <TextField
                label="Senha"
                required
                className={classes.field}
                style={{ marginTop: 0 }}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <TextField
                label="Confirmar Senha"
                required
                className={classes.field}
                type="password"
                value={passwordConf}
                onChange={e => setPasswordConf(e.target.value)}
              />

              {loading ? (
                <div className={classes.progress}>
                  <CircularProgress />
                </div>
              ) : (
                ''
              )}

              <FormControl className={classes.subButton}>
                <Button variant="contained" color="primary" type="submit">
                  Cadastrar
                </Button>
              </FormControl>
            </div>
          </form>
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

export default NewUser;
