/* @flow */
import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import Router from '../common/router';
import AppState from '../common/stores/appstate';

declare var window: {
    __INITIAL_STATE__: Object,
    location: {
        pathname: string
    }
};

const appstate = new AppState(window.__INITIAL_STATE__);

render(
    <Provider appstate={ appstate }>
        <Router path={ window.location.pathname }/>
    </Provider>,
    document.getElementById('root')
);
