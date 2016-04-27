import React, { Component } from 'react';
import { observer } from "mobx-react";
import { inject } from 'react-tunnel';

@inject(provided => ({ appstate: provided.appstate }))
@observer
export default class Root extends Component {
    
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        
        console.log(typeof window === 'object' ? 'client-side' : 'server-side');
    }
    
    addItem() {
        this.props.appstate.addItem('foobar');
    }
    
    render() {

        const { appstate } = this.props;
        
        return (
            <div>
                <button onClick={ this.addItem }>foobar</button>
                <ul>
                    { appstate.items.map((item, key) => <li key={ key }>{ item }</li>) }
                </ul>
            </div>
        );
    }
}

/* Or without decorators */

/*export default inject(provided => ({
    appstate: provided.appstate
}))(observer(Root));*/
