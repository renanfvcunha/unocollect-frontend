import React, { useState, FormEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  CssBaseline,
  TextField,
  Container,
  CircularProgress,
} from '@material-ui/core';

import { ApplicationState } from '../../store';
import { loginRequest, setErrorFalse } from '../../store/modules/auth/actions';
import useStyles from './styles';
import ModalAlert from '../../components/ModalAlert';

const Login: React.FC = () => {
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleModalClose() {
    setModalOpen(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    dispatch(loginRequest(username, password));
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
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário"
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
              Entrar
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

export default Login;
