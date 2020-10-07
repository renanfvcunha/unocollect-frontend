import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  ThemeProvider,
  Typography,
  FormControl,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  CircularProgress,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import { useStyles, theme } from './styles';
import { ApplicationState } from '../../../store';
import setPageTitle from '../../../store/modules/pageTitle/actions';
import {
  getUserRequest,
  updateUserRequest,
  setErrorFalse,
} from '../../../store/modules/users/actions';
import { getGroupsRequest } from '../../../store/modules/groups/actions';
import { checkTokenRequest, logout } from '../../../store/modules/auth/actions';
import ModalAlert from '../../../components/ModalAlert';
import tron from '../../../config/ReactotronConfig';

interface UserId {
  id: string;
}

interface UserGroupsChecked {
  checked: boolean;
}

const EditUser: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<UserId>();
  const pageTitle = 'Usuários > Editar Usuário';
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

  // Getting User Data
  const storedName = useSelector(
    (state: ApplicationState) => state.users.user.name,
  );
  const storedUsername = useSelector(
    (state: ApplicationState) => state.users.user.username,
  );
  const storedAdmin = useSelector(
    (state: ApplicationState) => state.users.user.admin,
  );
  const storedGroups = useSelector(
    (state: ApplicationState) => state.users.user.groups,
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
      history.push('/users');
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

    if (tron.log) {
      tron.log(userGroups);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let data = {};
    if (password) {
      data = {
        name,
        username,
        admin: admin === '1',
        groups: userGroups,
        password,
        passwordConf,
      };
    } else {
      data = {
        name,
        username,
        admin: admin === '1',
        groups: userGroups,
      };
    }

    dispatch(updateUserRequest(Number(id), data));
  };

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    dispatch(getUserRequest(Number(id)));
    dispatch(getGroupsRequest());
  }, [dispatch, id]);

  useEffect(() => {
    const userGroupsToSet = groups.map(group => {
      const userGrouped = storedGroups?.find(
        storedGroup => storedGroup === group.id,
      );

      if (userGrouped) {
        return {
          checked: true,
        };
      }

      return {
        checked: false,
      };
    });
    setUserGroupsChecked(userGroupsToSet);
  }, [groups, storedGroups]);

  useEffect(() => {
    if (storedName && storedUsername && storedGroups) {
      setName(storedName);
      setUsername(storedUsername);
      setAdmin(storedAdmin ? '1' : '0');
      setUserGroups(storedGroups);
    }
  }, [storedName, storedUsername, storedAdmin, storedGroups]);

  useEffect(() => {
    navBack();

    if (error) {
      setModalOpen(true);

      dispatch(setErrorFalse());
    }
  }, [navBack, error, success, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Link to="/users" style={{ position: 'absolute' }}>
          <Button variant="contained" color="primary">
            <ArrowBack className={classes.iconBack} />
            Voltar
          </Button>
        </Link>

        <div className={classes.form}>
          <form className={classes.formBox} onSubmit={handleSubmit}>
            <div className={classes.formRoot}>
              <Typography variant="h5" className={classes.title} align="center">
                Editar {name.split(' ')[0]}
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
                label="Nova Senha"
                className={classes.field}
                style={{ marginTop: 0 }}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <TextField
                label="Confirmar Senha"
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
                  Salvar
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

export default EditUser;
