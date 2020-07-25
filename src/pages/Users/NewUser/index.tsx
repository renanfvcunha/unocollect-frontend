import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  ThemeProvider,
  Typography,
  TextField,
  FormControl,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useStyles, Colors } from './styles';

const NewUser: React.FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Link to="/users">
        <ThemeProvider theme={Colors}>
          <Button variant="contained" color="primary">
            <ArrowBack className={classes.iconBack} />
            Voltar
          </Button>
        </ThemeProvider>
      </Link>

      <form className={classes.formBox}>
        <Typography variant="h5" className={classes.title} align="center">
          Novo Usuário
        </Typography>

        <div className={classes.formRoot}>
          <TextField
            label="Matrícula"
            fullWidth
            required
            className={classes.margin}
            type="number"
          />

          <TextField
            label="Nome Completo"
            fullWidth
            required
            className={classes.margin}
          />

          <TextField
            label="Nome de Usuário"
            fullWidth
            required
            className={classes.margin}
          />

          <TextField
            label="Senha"
            fullWidth
            required
            className={classes.margin}
            type="password"
          />

          <TextField
            label="Confirmar Senha"
            fullWidth
            required
            className={classes.margin}
            type="password"
          />

          <FormControl fullWidth className={classes.subButton}>
            <ThemeProvider theme={Colors}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.margin}
                type="submit"
              >
                Cadastrar
              </Button>
            </ThemeProvider>
          </FormControl>
        </div>
      </form>
    </main>
  );
};

export default NewUser;
