import React from 'react';
import JsonViewer from './components/JsonViewer';
import {toType} from './helpers/util';
//config key-val store
import ConfigStore from './stores/ConfigStore'

//global theme
import style from './themes/getStyle';


//forward src through to JsonObject component
export default class extends React.Component {

    constructor(props) {
        super(props);
        this.init(props);
    }

    state = {}

    //reference id for this instance
    rjvId = Date.now().toString()

    defaults = {
        src: {},
        name: 'root',
        theme: 'rjv-default', //rjv-default
        collapsed: false,
        indentWidth: 4,
        enableClipboard: true,
        displayObjectSize: true,
        displayDataTypes: true
    }

    init = (props) => {
        for (let i in this.defaults) {
            if (this.props[i] !== undefined) {
                this.state[i] = this.props[i];
            } else {
                this.state[i] = this.defaults[i];
            }
            ConfigStore.set(this.rjvId, i, this.state[i]);
        }

        //make sure `src` prop is valid
        if (toType(this.state.src) !== 'object'
            && toType(this.state.src) !== 'array'
        ) {
            console.log('ERROR: src property must be a valid json object');
            this.state.name = 'ERROR';
            this.state.src = {
                message: 'src property must be a valid json object'
            }
        }
    }

    render() {
        const {...props} = this.state;
        return (<div class="react-json-view"
            {...style(props.theme, 'app-container')} >
            <JsonViewer {...props} type={toType(props.src)} rjvId={this.rjvId} />
        </div>);
    }

    componentWillReceiveProps = (nextProps) => {
        this.init(props);
        this.setState(this.state);
    }


}