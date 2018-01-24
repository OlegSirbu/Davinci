import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';

import Home from './components/Home.jsx';
import DataSheet from './components/DataSheet.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="datasheet" component={DataSheet}/>
  </Route>
);