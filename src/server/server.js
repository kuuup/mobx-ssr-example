import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'mobx-react';

import express from 'express';

import Root from '../common/components/root';
import AppState from '../common/stores/appstate';
import routes from '../common/routes';

const app = express();


const renderView = (renderProps, appstate) => {
    
    const componentHTML = renderToString(
        <Provider appstate={ appstate }>
            <RouterContext {...renderProps} />
        </Provider>
    );
    
    const initialState = { appstate: appstate.toJson() };

    const HTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>MobX Test</title>
                <script>
                    window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) };
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

app.use(express.static(__dirname + '/../../dist/'));

app.use((req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        
        if(err) {
          console.error(err);
          return res.status(500).end('Internal server error');
        }
    
        if(!renderProps) return res.status(404).end('Not found');
        
        const appstate = new AppState();
        appstate.addItem('foo');
        appstate.addItem('bar');

        res.send(renderView(renderProps, appstate));
    });
});


app.listen(3000);
