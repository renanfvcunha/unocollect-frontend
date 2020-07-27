import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import NewUser from './pages/Users/NewUser';
import Forms from './pages/Forms';

const Routes: React.FC = () => {
  return (
    <>
      <Route exact path="/" component={Dashboard} />
      <Route path="/users" component={Users} />
      <Route path="/newuser" component={NewUser} />
      <Route path="/forms" component={Forms} />
    </>
  );
};

export default Routes;
