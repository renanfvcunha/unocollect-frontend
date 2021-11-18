import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ApplicationState } from './store';
import { checkHasUserRequest } from './store/modules/auth/actions';
import Menu from './components/Menu';
import Login from './pages/Login';
import FirstUser from './pages/FirstUser';
import PrivacyPolicy from './pages/PrivacyPolicy';

const Auth: React.FC = () => {
  const logged = useSelector((state: ApplicationState) => state.auth.logged);
  const hasUser = useSelector((state: ApplicationState) => state.auth.hasUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkHasUserRequest());
  }, [dispatch]);

  if (window.location.pathname === '/politica-de-privacidade') {
    return <PrivacyPolicy />;
  }

  if (!hasUser) {
    return <FirstUser />;
  }

  if (hasUser && !logged) {
    return <Login />;
  }

  return <Menu />;
};

export default Auth;
