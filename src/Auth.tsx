import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from './store';
import Menu from './components/Menu';
import Login from './pages/Login';

const Auth: React.FC = () => {
  const logged = useSelector((state: ApplicationState) => state.auth.logged);

  if (!logged) {
    return <Login />;
  }

  return <Menu />;
};

export default Auth;
