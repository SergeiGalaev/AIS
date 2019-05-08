import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Forms = React.lazy(() => import('./views/Base/Forms'));
const Users = React.lazy(() => import('./views/Users/Users'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/users', exact: true,  name: 'Users', component: Users },
];

export default routes;
