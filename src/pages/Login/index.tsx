import React, { useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import { ApplicationState } from '../../store';
import { loginRequest } from '../../store/modules/auth/actions';
import useStyles from './styles';

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: ApplicationState) => state.auth.loading
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    dispatch(loginRequest(username, password));
  }

  return (
    <main className={classes.content}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Data Collector - Login
          </Typography>
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

            { loading ?
            <div className={classes.progress}>
              <CircularProgress />
            </div>
            : ''
            }

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
    </main>
  );
};

export default Login;
