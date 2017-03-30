/* @flow */
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'mobx-react';

import Router, { routes } from '../common/router';
import AppState from '../common/stores/appstate';

const renderView = (req, appstate) => {

    const componentHTML = renderToString(
        <Provider appstate={ appstate }>
            <Router path={ req.url } />
        </Provider>
    );

    const HTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>MobX Test</title>
                <script>
                    window.__INITIAL_STATE__ = ${ JSON.stringify({ appstate: appstate.toJson() }) };
                </script>
            </head>
            <body>
                <div id="root">${componentHTML}</div>
                <script type="application/javascript" src="/bundle.js"></script>
            </body>
        </html>
    `;

    return HTML;
};

createServer((req, res) => {

    if(req.url === '/bundle.js') {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        fs.createReadStream(path.resolve(__dirname, '../../dist/bundle.js')).pipe(res);
    } else {

        if(routes.has(req.url)) {

            const appstate = new AppState();
            appstate.addItem('foo');
            appstate.addItem('bar');

            res.write(renderView(req, appstate));
            res.end();

        } else {

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('404 Not Found\n');
            res.end();

        }
    }

}).listen(3000)
