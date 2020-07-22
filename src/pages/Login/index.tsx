import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
} from '@material-ui/core';
import { MdLockOutline } from 'react-icons/md';
import useStyles from './styles';

const Login: React.FC = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Data Collector - Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuário"
            name="username"
            autoFocus
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar"
          />
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
  );
};

export default Login;
