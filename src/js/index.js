import React from 'react';
import JsonViewer from './components/JsonViewer';
import {toType} from './helpers/util';

//global style
//TODO make this theme customizable
require('./../style/app-globals.scss');


//forward src through to JsonObject component
export default class extends React.Component {

    constructor(props) {
        super(props);
        for (let i in this.defaults) {
            if (this.props[i] !== undefined) {
                this.state[i] = this.props[i];
            } else {
                this.state[i] = this.defaults[i];
            }
        }

        //make sure `src` prop is valid
        if (toType(this.state.src) !== 'object') {
            console.log('ERROR: src property must be a valid json object');
            this.state.name = 'ERROR';
            this.state.src = {
                message: 'src property must be a valid json object',
                received: this.state.src
            }
        }
    }

    state = {}

    defaults = {
        src: {},
        name: 'root',
        collapsed: false,
        indentWidth: 4
    }

    render() {
        const {...props} = this.state;
        return (<div class="react-json-view">
            <JsonViewer {...props} />
        </div>);
    }
}