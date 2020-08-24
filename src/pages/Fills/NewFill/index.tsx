import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  ThemeProvider,
  Button,
  Typography,
  Divider,
  TextField,
  FormControl,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import { ApplicationState } from '../../../store';
import setPageTitle from '../../../store/modules/pageTitle/actions';
import { getFormRequest } from '../../../store/modules/forms/actions';
import { addFillRequest } from '../../../store/modules/fills/actions';
import { useStyles, Buttons } from './styles';

interface Values {
  fieldId?: number;
  value: string;
}

const NewFill: React.FC = () => {
  const { formId } = useParams();
  const classes = useStyles();
  const pageTitle = 'Preenchimentos > Novo Preenchimento';
  const dispatch = useDispatch();

  const formTitle = useSelector(
    (state: ApplicationState) => state.forms.form.title,
  );
  const formDescription = useSelector(
    (state: ApplicationState) => state.forms.form.description,
  );
  const formFields = useSelector(
    (state: ApplicationState) => state.forms.form.fields,
  );
  const latitude = useSelector(
    (state: ApplicationState) => state.fills.fill.latitude,
  );
  const longitude = useSelector(
    (state: ApplicationState) => state.fills.fill.longitude,
  );

  const [formValues, setFormValues] = useState<Values[]>([]);

  function handleChangeValue(
    i: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const newValue = [...formValues];

    const value = {
      ...newValue[i],
      value: e.target.value,
    };

    newValue[i] = value;

    setFormValues(newValue);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const fill = {
      formId,
      latitude,
      longitude,
      values: formValues,
    };

    dispatch(addFillRequest(fill));
  }

  const formInputs = [];
  if (formFields) {
    for (let i = 0; i < formFields.length; i += 1) {
      formValues.push({
        fieldId: formFields[i].id,
        value: '',
      });

      formInputs.push(
        <TextField
          key={formFields[i].id}
          type="text"
          name={`field_${String(formFields[i].id)}`}
          label={formFields[i].name}
          helperText={formFields[i].description}
          multiline
          style={{ width: '50%', marginLeft: '25%' }}
          className={classes.margin}
          value={formValues[i].value}
          onChange={e => handleChangeValue(i, e)}
        />,
      );

      formValues.splice(formFields.length);
    }
  }

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));

    dispatch(getFormRequest(formId));
  }, [dispatch, formId]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Link to="/fills" style={{ position: 'absolute' }}>
        <ThemeProvider theme={Buttons}>
          <Button variant="contained" color="primary">
            <ArrowBack className={classes.iconBack} />
            Voltar
          </Button>
        </ThemeProvider>
      </Link>

      <div className={classes.form}>
        <form className={classes.formBox} onSubmit={handleSubmit}>
          <Typography variant="h5" className={classes.title} align="center">
            {formTitle}
          </Typography>
          <Typography className={classes.subtitle} align="center">
            {formDescription}
          </Typography>

          <Divider style={{ marginTop: 24 }} />

          {formInputs}

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
