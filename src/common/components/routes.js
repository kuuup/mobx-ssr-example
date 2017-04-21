/* @flow */
import React from 'react';
import { Route, Switch } from 'react-router';
import Root from './root';
import NotFound from './notfound';

type Props = {};

export default function Routes(props: Props) {
    return (
        <Switch>
            <Route exact path='/' component={ Root }/>

            {/* Add your Routes here */}

            <Route component={ NotFound }/>
        </Switch>
    );
}
