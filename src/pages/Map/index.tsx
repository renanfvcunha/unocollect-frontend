import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, FormControl, Select, MenuItem } from '@material-ui/core';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

import { ApplicationState } from '../../store';
import setPageTitle from '../../store/modules/pageTitle/actions';
import {
  getFormsRequest,
  setErrorFalse as setErrorFormsFalse,
} from '../../store/modules/forms/actions';
import {
  setErrorFalse as setErrorUsersFalse,
  getUsersFormsRequest,
} from '../../store/modules/users/actions';
import { checkTokenRequest, logout } from '../../store/modules/auth/actions';
import useStyles from './styles';
import ModalAlert from '../../components/ModalAlert';

const Map: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = 'Mapa';

  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );

  const forms = useSelector((state: ApplicationState) => state.forms.forms);
  const usersForms = useSelector(
    (state: ApplicationState) => state.users.usersForms,
  );

  const errorUsers = useSelector(
    (state: ApplicationState) => state.users.error,
  );
  const modalMsgUsers = useSelector(
    (state: ApplicationState) => state.users.modalMsg,
  );
  const modalTitleUsers = useSelector(
    (state: ApplicationState) => state.users.modalTitle,
  );
  const errorForms = useSelector(
    (state: ApplicationState) => state.forms.error,
  );
  const modalMsgForms = useSelector(
    (state: ApplicationState) => state.forms.modalMsg,
  );
  const modalTitleForms = useSelector(
    (state: ApplicationState) => state.forms.modalTitle,
  );

  const [formState, setFormState] = useState(0);
  const [modalAlert, setModalAlert] = useState(false);

  const handleModalClose = () => {
    setModalAlert(false);
  };

  const handleChangeForm = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormState(Number(e.target.value));
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
    dispatch(getUsersFormsRequest(formState));
  }, [dispatch, formState]);

  useEffect(() => {
    if (errorUsers || errorForms) {
      setModalAlert(true);

      dispatch(setErrorUsersFalse());
      dispatch(setErrorFormsFalse());
    }
  }, [dispatch, errorUsers, errorForms]);

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
            {forms ? (
              forms.map(form => (
                <MenuItem key={form.id} value={form.id}>
                  {form.title}
                </MenuItem>
              ))
            ) : (
              <div />
            )}
          </Select>
        </FormControl>
      </div>

      <div className={classes.centeredMap}>
        <LeafletMap
          center={[-5.10458, -42.8289127]}
          zoom={13}
          className={classes.map}
        >
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
                <Typography variant="body1" component="span">
                  Preenchimento: {userForm.id}
                </Typography>
                <br />
                <Typography variant="body1" component="span">
                  Usuário: {userForm.created_by}
                </Typography>
                <br />
                <Typography variant="body1" component="span">
                  Criado em: {userForm.created_at}
                </Typography>
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
      </div>

      <ModalAlert
        open={modalAlert}
        close={handleModalClose}
        title={modalTitleUsers || modalTitleForms}
        msg={modalMsgUsers || modalMsgForms}
      />
    </main>
  );
};

export default Map;
