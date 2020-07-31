import React from 'react';
import {
  ThemeProvider,
  Button,
  Typography,
  Divider,
  TextField,
  FormControl,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import { useStyles, Buttons } from './styles';

const NewFill: React.FC = () => {
  const { formId } = useParams();
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Link to="/forms" style={{ position: 'absolute' }}>
        <ThemeProvider theme={Buttons}>
          <Button variant="contained" color="primary">
            <ArrowBack className={classes.iconBack} />
            Voltar
          </Button>
        </ThemeProvider>
      </Link>

      <div className={classes.form}>
        <form className={classes.formBox}>
          <Typography variant="h5" className={classes.title} align="center">
            Formulário {formId}
          </Typography>
          <Typography className={classes.subtitle} align="center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            at quis iusto pariatur tenetur.
          </Typography>

          <Divider style={{ marginTop: 24 }} />

          <TextField
            type="text"
            helperText="Descrição do campo 1"
            name="field1"
            label="Campo 1"
            multiline
            style={{ width: '50%', marginLeft: '25%' }}
            className={classes.margin}
          />
          <TextField
            type="text"
            helperText="Descrição do campo 2"
            name="field2"
            label="Campo 2"
            multiline
            style={{ width: '50%', marginLeft: '25%' }}
            className={classes.margin}
          />
          <TextField
            type="text"
            helperText="Descrição do campo 3"
            name="field3"
            label="Campo 3"
            multiline
            style={{ width: '50%', marginLeft: '25%' }}
            className={classes.margin}
          />

          <FormControl className={classes.subButton}>
            <ThemeProvider theme={Buttons}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.margin}
                type="submit"
              >
                Enviar
              </Button>
            </ThemeProvider>
          </FormControl>
        </form>
      </div>
    </main>
  );
};

export default NewFill;
