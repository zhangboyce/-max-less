'use strict';

import React, { Component } from 'react';
import { Route } from 'react-router';
import OrderContainer from './containers/OrderContainer'
import App from './App.jsx';


module.exports = (
    <Route component={ App }>
        <Route path="/" component={ OrderContainer } />
    </Route>
);