import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Button,
  ThemeProvider,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

// import { ApplicationState } from '../../../store';
import setPageTitle from '../../../store/modules/pageTitle/actions';
import { addUserRequest } from '../../../store/modules/users/actions';
import { useStyles, BtnStyle, GreenTextField } from './styles';
import tron from '../../../config/ReactotronConfig';

const NewUser: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageTitle = 'Usuários > Novo Usuário';

  const [registration, setRegistration] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [admin, setAdmin] = useState('0');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
  }, [dispatch]);

  function handleSelectAdmin(e: ChangeEvent<HTMLSelectElement>) {
    setAdmin(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = {
      registration: Number(registration),
      name,
      username,
      admin: admin === '1',
      password,
      passwordConf,
    };

    tron.log!(data);

    dispatch(addUserRequest(data));
  }

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
        <form className={classes.formBox} onSubmit={handleSubmit}>
          <div className={classes.formRoot}>
            <Typography variant="h5" className={classes.title} align="center">
              Novo Usuário
            </Typography>
            <GreenTextField
              label="Matrícula"
              required
              className={classes.field}
              value={registration}
              onChange={e => setRegistration(e.target.value)}
            />

            <GreenTextField
              label="Nome Completo"
              required
              className={classes.field}
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <GreenTextField
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

            <GreenTextField
              label="Senha"
              required
              className={classes.field}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <GreenTextField
              label="Confirmar Senha"
              required
              className={classes.field}
              type="password"
              value={passwordConf}
              onChange={e => setPasswordConf(e.target.value)}
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

export default NewUser;
