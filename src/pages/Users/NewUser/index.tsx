import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Button,
  ThemeProvider,
  Typography,
  FormControl,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { ApplicationState } from '../../../store';
import * as PageTitleActions from '../../../store/modules/pageTitle/actions';
import { useStyles, BtnStyle, GreenTextField } from './styles';

const NewUser: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageTitle = 'Usuários > Novo Usuário';

  useEffect(() => {
    dispatch(PageTitleActions.default(pageTitle));
  }, [dispatch]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Link to="/users" style={{ position: 'absolute' }}>
        <ThemeProvider theme={BtnStyle}>
          <Button variant="contained" color="primary">
            <ArrowBack className={classes.iconBack} />
            Voltar
          </Button>
        </ThemeProvider>
      </Link>

      <div className={classes.form}>
        <form className={classes.formBox}>
          <div className={classes.formRoot}>
            <Typography variant="h5" className={classes.title} align="center">
              Novo Usuário
            </Typography>
            <GreenTextField
              label="Matrícula"
              required
              className={classes.field}
            />

            <GreenTextField
              label="Nome Completo"
              required
              className={classes.field}
            />

            <GreenTextField
              label="Nome de Usuário"
              required
              className={classes.field}
            />

            <GreenTextField
              label="Senha"
              required
              className={classes.field}
              type="password"
            />

            <GreenTextField
              label="Confirmar Senha"
              required
              className={classes.field}
              type="password"
            />

            <FormControl className={classes.subButton}>
              <ThemeProvider theme={BtnStyle}>
                <Button variant="contained" color="primary" type="submit">
                  Cadastrar
                </Button>
              </ThemeProvider>
            </FormControl>
          </div>
        </form>
      </div>
    </main>
  );
};

export default connect((state: ApplicationState) => ({
  title: state.pageTitle.title,
}))(NewUser);
