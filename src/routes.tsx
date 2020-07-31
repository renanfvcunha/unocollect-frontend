import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import NewUser from './pages/Users/NewUser';
import Forms from './pages/Forms';
import NewForm from './pages/Forms/NewForm';
import ShowForm from './pages/Forms/ShowForm';
import NewFill from './pages/Fills/NewFill';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />

      <Route path="/users/new" component={NewUser} />
      <Route path="/users" component={Users} />

      <Route path="/forms/new" component={NewForm} />
      <Route path="/forms/:id" component={ShowForm} />
      <Route path="/forms" component={Forms} />

      <Route path="/fills/add/:formId" component={NewFill} />
    </Switch>
  );
};

export default Routes;
