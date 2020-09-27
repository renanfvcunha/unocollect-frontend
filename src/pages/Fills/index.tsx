import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';

import { ApplicationState } from '../../store';
import setPageTitle from '../../store/modules/pageTitle/actions';
import { getFormsRequest } from '../../store/modules/fills/actions';
import useStyles from './styles';

const Fills: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const title = 'Preenchimentos';
  const forms = useSelector((state: ApplicationState) => state.fills.forms);

  useEffect(() => {
    dispatch(setPageTitle(title));

    dispatch(getFormsRequest());
  }, [dispatch]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography
        variant="h3"
        component="h1"
        align="center"
        style={{ marginBottom: 16 }}
      >
        Formulários a preencher
      </Typography>
      <div className={classes.cardRoot}>
        {forms ? (
          forms.map(form => (
            <Card key={form.id} className={classes.card}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ marginBottom: 12 }}
                >
                  {form.title}
                </Typography>

                <Typography variant="body2" component="p">
                  {form.description}
                </Typography>
              </CardContent>

              <CardActions className={classes.btnCenter}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => history.push(`/fills/add/${form.id}`)}
                >
                  Visualizar
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Card />
        )}
      </div>
    </main>
  );
};

export default Fills;
