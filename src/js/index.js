import React from 'react';
import JsonViewer from './components/JsonViewer';
import {toType} from './helpers/util';
import ObjectAttributes from './stores/ObjectAttributes';

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
        displayDataTypes: true,
        onEdit: false
    }

    componentWillMount() {
        ObjectAttributes.on(
            'variable-update-' + this.rjvId, this.updateSrc
        );
    }

    componentWillUnmount() {
        ObjectAttributes.removeListener(
            'variable-update-' + this.rjvId, this.updateSrc
        );
    }

    init = (props) => {
        for (let i in this.defaults) {
            if (props[i] !== undefined) {
                this.state[i] = props[i];
            } else {
                this.state[i] = this.defaults[i];
            }
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

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
        this.setState(this.state);
    }

    updateSrc = () => {
        let {
            name, namespace, new_value, existing_value
        } = ObjectAttributes.get(
            this.rjvId, 'action', 'variable-update'
        );
        let {src, onEdit} = this.state;
        namespace.shift();

        for (const idx of namespace) {
            src = src[idx];
        }
        src[name] = new_value;
        this.setState(this.state);

        const on_edit_payload = {
            updated_src: this.state.src,
            name: name,
            namespace: namespace,
            new_value: new_value,
            existing_value: existing_value,
        }
        if (toType(onEdit) === 'function') {
            onEdit(on_edit_payload);
        }

    }
}
