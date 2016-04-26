import React, { Component } from 'react';
import AppState from '../stores/appstate'

export default class ContextProvider extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    store: React.PropTypes.object
  };

  getChildContext() {
    /**
     * Register stores to be passed down to components
     */
    return {
      store: {
        appstate: this.props.appstate
      }
    };
  }

  render() {
    return this.props.children;
  }
}