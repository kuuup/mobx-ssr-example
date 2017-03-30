/* @flow */
import React, { Component } from 'react';
import Root from './components/root';

type Props = {
    path?: string
};

export const routes: Map<string, React$Element<*>> = new Map();
routes.set('/', <Root />);

export default class Router extends Component {

    props: Props;

    constructor(props: Props) {
        super(props);
    }

    render() {
        if(this.props.path && routes.has(this.props.path))
            return routes.get(this.props.path)

        return null;
    }

}
