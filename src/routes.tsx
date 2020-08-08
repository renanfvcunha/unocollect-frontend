import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { ApplicationState } from './store';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import NewUser from './pages/Users/NewUser';
import Forms from './pages/Forms';
import NewForm from './pages/Forms/NewForm';
import ShowForm from './pages/Forms/ShowForm';
import Fills from './pages/Fills';
import NewFill from './pages/Fills/NewFill';

interface StateProps {
  admin: boolean;
}

const Routes: React.FC<StateProps> = ({ admin }) => {
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

export default connect((state: ApplicationState) => ({
  admin: state.auth.user.admin,
}))(Routes);
