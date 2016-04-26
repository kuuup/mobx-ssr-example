import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';

import express from 'express';

import { Provider } from 'react-tunnel';
import Root from '../common/components/root';
import AppState from '../common/stores/appstate';
import routes from '../common/routes';

const app = express();
const appstate = new AppState();

const renderView = (renderProps) => {
    
    const componentHTML = renderToString(
        <Provider provide={{ appstate: appstate }}>
            { (() => <RouterContext {...renderProps} />) }
        </Provider>
    );

    const initialState = { appstate };

    const HTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="theme-color" content="#003466">
                <meta name="msapplication-navbutton-color" content="#003466">
                <meta name="apple-mobile-web-app-status-bar-style" content="#003466">
                
                <title>MobX Test</title>
                <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                </script>
                
            </head>
            <body style="background-color:rgb(255, 255, 255)">
                <div id="root">${componentHTML}</div>
                <script type="application/javascript" src="/bundle.js"></script>
            </body>
        </html>
    `;

    return HTML;
};

app.use(express.static(__dirname + '/../../dist/'));

app.use((req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        
        if(err) {
          console.error(err);
          return res.status(500).end('Internal server error');
        }
    
        if(!renderProps) return res.status(404).end('Not found');
        
        res.send(renderView(renderProps));
    });
});


app.listen(3000);
