import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from '@material-ui/core';
import { Assignment } from '@material-ui/icons';
import { Line } from 'react-chartjs-2';

import setPageTitle from '../../store/modules/pageTitle/actions';
import useStyles from './styles';
import { checkTokenRequest, logout } from '../../store/modules/auth/actions';
import { getFormsRequest } from '../../store/modules/forms/actions';
import { ApplicationState } from '../../store';
import api from '../../services/api';

interface FillsPerDay {
  fills: number[];
  dates: string[];
}

const Home: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = 'Página Inicial';
  const history = useHistory();

  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );
  const forms = useSelector((state: ApplicationState) => state.forms.forms);

  const [fillsPerDay, setFillsPerDay] = useState<FillsPerDay>({
    fills: [],
    dates: [],
  });

  const chartData = {
    labels: fillsPerDay.dates,
    datasets: [
      {
        label: 'Preenchimentos',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: fillsPerDay.fills,
      },
    ],
  };

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    dispatch(setPageTitle(title));
    dispatch(getFormsRequest());
  }, [dispatch]);

  useEffect(() => {
    api.get('fillsperday').then(response => {
      setFillsPerDay(response.data);
    });
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Typography
        variant="h4"
        component="h1"
        align="center"
        style={{ marginBottom: 8 }}
      >
        Preenchimentos nos últimos 5 dias
      </Typography>

      <Line data={chartData} height={50} />

      <Typography
        variant="h4"
        component="h1"
        align="center"
        style={{ marginTop: 16, marginBottom: 8 }}
      >
        Formulários Ativos
      </Typography>

      <Box className={classes.lastForms}>
        <Box className={classes.lastFormsBox}>
          <List style={{ flexWrap: 'nowrap' }}>
            {forms.length !== 0 ? (
              forms.map(form => {
                if (form.status === 'Ativo') {
                  return (
                    <Button
                      key={form.id}
                      className={classes.lastFormsBtn}
                      onClick={() => history.push(`/forms/${form.id}`)}
                    >
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Assignment />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={form.title}
                          secondary={`Preenchimentos: ${form.fills}`}
                        />
                      </ListItem>
                    </Button>
                  );
                }
                return <Box />;
              })
            ) : (
              <Typography>Não há formulários</Typography>
            )}
          </List>
        </Box>
      </Box>
    </main>
  );
};

export default Home;
