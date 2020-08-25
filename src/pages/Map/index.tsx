import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, FormControl, Select, MenuItem } from '@material-ui/core';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

import { ApplicationState } from '../../store';
import setPageTitle from '../../store/modules/pageTitle/actions';
import { getFormsRequest } from '../../store/modules/forms/actions';
import { getUsersFormsRequest } from '../../store/modules/users/actions';
import useStyles from './styles';
import tron from '../../config/ReactotronConfig';

const Map: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = 'Mapa';

  const latitude = useSelector(
    (state: ApplicationState) => state.fills.fill.latitude,
  );
  const longitude = useSelector(
    (state: ApplicationState) => state.fills.fill.longitude,
  );
  const forms = useSelector((state: ApplicationState) => state.forms.forms);
  const usersForms = useSelector(
    (state: ApplicationState) => state.users.usersForms,
  );

  const [currentLocation, setCurrentLocation] = useState<[number, number]>([
    0,
    0,
  ]);
  const [formState, setFormState] = useState(0);

  useEffect(() => {
    dispatch(setPageTitle(title));

    dispatch(getFormsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (latitude && longitude) {
      setCurrentLocation([latitude, longitude]);
    }
  }, [latitude, longitude]);

  function handleChangeForm(e: ChangeEvent<HTMLSelectElement>) {
    setFormState(Number(e.target.value));
  }

  useEffect(() => {
    dispatch(getUsersFormsRequest(formState));
  }, [dispatch, formState]);

  tron.log!(usersForms);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography
        variant="h4"
        component="h1"
        align="center"
        style={{ marginBottom: 16 }}
      >
        Localização de usuários por formulário
      </Typography>

      <div className={classes.centeredSelect}>
        <FormControl>
          <Select value={formState} onChange={handleChangeForm}>
            <MenuItem value={0}>Selecione um formulário</MenuItem>
            {forms.map(form => (
              <MenuItem key={form.id} value={form.id}>
                {form.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={classes.centeredMap}>
        <LeafletMap center={currentLocation} zoom={15} className={classes.map}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {usersForms.map(userForm => (
            <Marker
              key={userForm.id}
              position={
                userForm.latitude && userForm.longitude
                  ? [userForm.latitude, userForm.longitude]
                  : [0, 0]
              }
            >
              <Popup>
                <Typography variant="body1" component="p">
                  Usuário: {userForm.created_by}
                </Typography>
                <Typography variant="body1" component="p">
                  Criado em: {userForm.created_at}
                </Typography>
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
      </div>
    </main>
  );
};

export default Map;
