import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import IncidentLogPage from './IncidentLogPage';
import IncidentsPage from './IncidentsPage';
import LoginPage from './LoginPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="/pd/:subdomain/:token" component={IncidentsPage} />
    <Route path="/pd/:subdomain/:token/incident/:id" component={IncidentLogPage} />
  </Route>
);
