'use strict';

import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";
const Provider = require('react-redux').Provider;
import __config__ from '../common/__config__';
import configureStore from './store/configureStore';
import App from "./App";
import './public/css/base.css';
import './public/css/cover.css';

const $app = document.getElementById('app');
const config = $app.dataset;
__config__.set(config);

const hist = createBrowserHistory();

ReactDOM.render(
<Provider store={configureStore({})}>
    <Router history={ hist }>
        <Switch>
            <Route path="/" component={ App } />
        </Switch>
    </Router>
</Provider>, $app);