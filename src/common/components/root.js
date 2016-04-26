import React, { Component } from 'react';
import { observer } from "mobx-react";
import { inject } from 'react-tunnel';
//import { connect } from 'mobx-connect';

/*export default observer(({ appstate }) =>
    <div>
        <button onClick={ () => appstate.addItem('uuuu1234') }>zZzZzZ</button>
        <ul>
            { appstate.items.map((item, key) => <li key={ key }>{ item }</li>) }
        </ul>
    </div>
);*/

@observer
class Root extends Component {
    
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
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

export default inject(provided => ({
    appstate: provided.appstate
}))(Root);