import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Forms from './pages/Forms';
import NewForm from './pages/Forms/NewForm';
import EditForm from './pages/Forms/EditForm';
import ShowForm from './pages/Forms/ShowForm';
import Categories from './pages/Forms/Categories';
import Groups from './pages/Groups';
import Map from './pages/Map';
import Users from './pages/Users';
import NewUser from './pages/Users/NewUser';
import EditUser from './pages/Users/EditUser';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route path="/forms/categories" component={Categories} />
      <Route path="/forms/new" component={NewForm} />
      <Route path="/forms/edit/:id" component={EditForm} />
      <Route path="/forms/:id" component={ShowForm} />
      <Route path="/forms" component={Forms} />

      <Route path="/groups" component={Groups} />

      <Route path="/map" component={Map} />

      <Route path="/users/new" component={NewUser} />
      <Route path="/users/edit/:id" component={EditUser} />
      <Route path="/users" component={Users} />
    </Switch>
  );
};

export default Routes;
