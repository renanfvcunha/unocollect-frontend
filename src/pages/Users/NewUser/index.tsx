import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  ThemeProvider,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
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
import ModalAlert from '../../../components/ModalAlert';

const NewUser: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageTitle = 'Usuários > Novo Usuário';

  const loading = useSelector((state: ApplicationState) => state.users.loading);
  const success = useSelector((state: ApplicationState) => state.users.success);
  const error = useSelector((state: ApplicationState) => state.users.error);
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
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSelectAdmin = (e: ChangeEvent<HTMLSelectElement>) => {
    setAdmin(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      username,
      admin: admin === '1',
      password,
      passwordConf,
    };

    dispatch(addUserRequest(data));
  };

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
  }, [dispatch]);

  useEffect(() => {
    if (error || success) {
      setModalOpen(true);

      dispatch(setErrorFalse());
    }
  }, [error, success, dispatch]);

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

              <FormControl className={classes.field}>
                <InputLabel id="demo-simple-select-helper-label">
                  Admin
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={admin}
                  onChange={handleSelectAdmin}
                >
                  <MenuItem value="1">Sim</MenuItem>
                  <MenuItem value="0">Não</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Senha"
                required
                className={classes.field}
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
