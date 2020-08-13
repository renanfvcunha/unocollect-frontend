import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ApplicationState } from './store';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import NewUser from './pages/Users/NewUser';
import Forms from './pages/Forms';
import NewForm from './pages/Forms/NewForm';
import ShowForm from './pages/Forms/ShowForm';
import Fills from './pages/Fills';
import NewFill from './pages/Fills/NewFill';

const Routes: React.FC = () => {
  const admin = useSelector((state: ApplicationState) => state.auth.user.admin);

  return (
    <Switch>
      {admin ? <Route exact path="/" component={Dashboard} /> : ''}

      {admin ? <Route path="/users/new" component={NewUser} /> : ''}
      {admin ? <Route path="/users" component={Users} /> : ''}

      {admin ? <Route path="/forms/new" component={NewForm} /> : ''}
      {admin ? <Route path="/forms/:id" component={ShowForm} /> : ''}
      {admin ? <Route path="/forms" component={Forms} /> : ''}

      <Route exact path="/fills" component={Fills} />
      <Route path="/fills/add/:formId" component={NewFill} />
    </Switch>
  );
};

export default Routes;
