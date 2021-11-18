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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import { ApplicationState } from '../../../store';
import setPageTitle from '../../../store/modules/pageTitle/actions';
import { getFormRequest } from '../../../store/modules/forms/actions';
import { addFillRequest } from '../../../store/modules/fills/actions';
import { useStyles, Theme } from './styles';

interface Values {
  fieldId?: number;
  value: string;
}

const NewFill: React.FC = () => {
  const { formId } = useParams<{ formId: string | undefined }>();
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
  /* const latitude = useSelector(
    (state: ApplicationState) => state.fills.fill.latitude,
  );
  const longitude = useSelector(
    (state: ApplicationState) => state.fills.fill.longitude,
  ); */

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

    /* const fill = {
      formId,
      latitude,
      longitude,
      values: formValues,
    }; */

    const values = formValues.map(value => JSON.stringify(value));

    const fill = new FormData();
    fill.append('latitude', String(-5.092493));
    fill.append('longitude', String(-42.8286787));
    fill.append('date', String(new Date()));
    for (let i = 0; i < formValues.length; i += 1) {
      fill.append(`values[${i}]`, values[i]);
    }

    dispatch(addFillRequest(fill, formId as string));
  }

  if (formFields) {
    for (let i = 0; i < formFields.length; i += 1) {
      formValues.push({
        fieldId: formFields[i].id,
        value: '',
      });

      formValues.splice(formFields.length);
    }
  }

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));

    dispatch(getFormRequest(parseInt(formId as string)));
  }, [dispatch, formId]);

  return (
    <ThemeProvider theme={Theme}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Link to="/fills" style={{ position: 'absolute' }}>
          <Button variant="contained" color="primary">
            <ArrowBack className={classes.iconBack} />
            Voltar
          </Button>
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

            {formFields ? (
              formFields.map((field, i) => {
                if (field.type === 'text') {
                  return (
                    <TextField
                      key={field.id}
                      type="text"
                      name={`field_${String(field.id)}`}
                      label={field.name}
                      helperText={field.description}
                      multiline
                      style={{ width: '50%', marginLeft: '25%' }}
                      className={classes.margin}
                      value={formValues[i].value}
                      onChange={e => handleChangeValue(i, e)}
                    />
                  );
                }
                if (field.type === 'radio') {
                  return (
                    <FormControl
                      key={field.id}
                      component="fieldset"
                      className={classes.margin}
                      style={{ width: '50%', marginTop: 16, marginLeft: '25%' }}
                    >
                      <FormLabel component="legend">{field.name}</FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={formValues[i].value}
                        onChange={e => handleChangeValue(i, e)}
                      >
                        {field.options.map(option => (
                          <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={option}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  );
                }
                return <div />;
              })
            ) : (
              <div />
            )}

            <FormControl className={classes.subButton}>
              <Button
                variant="contained"
                color="primary"
                className={classes.margin}
                type="submit"
              >
                Enviar
              </Button>
            </FormControl>
          </form>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default NewFill;
