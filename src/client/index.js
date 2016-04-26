import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-tunnel';

import Root from '../common/components/root';
import AppState from '../common/stores/appstate';
import routes from '../common/routes';

const initialState = window.__INITIAL_STATE__ || {};
const appstate = AppState.fromJS(initialState || []);

render(
    <Provider provide={{ appstate: appstate }}>
        { (() => <Router children={ routes } history={ browserHistory }/>) }
    </Provider>,
    document.getElementById('root')
);
