import React, { useState, FormEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  CssBaseline,
  TextField,
  Container,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import { ApplicationState } from '../../store';
import {
  addFisrtUserRequest,
  setErrorFalse,
} from '../../store/modules/auth/actions';
import useStyles from './styles';
import ModalAlert from '../../components/ModalAlert';

const FirstUser: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state: ApplicationState) => state.auth.loading);
  const error = useSelector((state: ApplicationState) => state.auth.error);
  const errorMsg = useSelector(
    (state: ApplicationState) => state.auth.errorMsg,
  );
  const errorTitle = useSelector(
    (state: ApplicationState) => state.auth.errorTitle,
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  function handleModalClose() {
    setModalOpen(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    dispatch(addFisrtUserRequest(name, username, password, passwordConf));
  }

  useEffect(() => {
    if (error) {
      setModalOpen(true);

      dispatch(setErrorFalse());
    }
  }, [error, dispatch]);

  return (
    <main className={classes.content}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src="/assets/images/logoUnoCollect.png"
            alt="Logo Uno Collect"
            width="200"
            height="200"
          />
          <Typography
            variant="h5"
            component="h1"
            align="center"
            style={{ fontWeight: 'bold', marginTop: 16 }}
          >
            Bem-Vindo(a).
          </Typography>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            style={{ fontWeight: 'bold' }}
          >
            Cadastre um usuário para começar.
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome Completo"
              name="name"
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nome de Usuário"
              name="username"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordconf"
              label="Confirmar Senha"
              type="password"
              id="passwordconf"
              autoComplete="current-password"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </Container>
      <ModalAlert
        open={modalOpen}
        close={handleModalClose}
        title={errorTitle}
        msg={errorMsg}
      />
    </main>
  );
};

export default FirstUser;
