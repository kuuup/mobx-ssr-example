import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-tunnel';

import AppState from '../common/stores/appstate';
import routes from '../common/routes';

const appstate = new AppState(window.__INITIAL_STATE__);

render(
    <Provider provide={{ appstate: appstate }}>
        { (() => <Router children={ routes } history={ browserHistory }/>) }
    </Provider>,
    document.getElementById('root')
);
