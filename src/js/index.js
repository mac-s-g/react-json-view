import React from 'react';
import JsonViewer from './components/JsonViewer';
import AddKeyRequest from './components/AddKeyRequest';
import {toType, isTheme} from './helpers/util';
import ObjectAttributes from './stores/ObjectAttributes';

//global theme
import Theme from './themes/getStyle';


//forward src through to JsonObject component
export default class extends React.Component {

    constructor(props) {
        super(props);
        this.init(props);
        ObjectAttributes.set(
            this.rjvId,
            'global',
            'src',
            this.state.src
        );
    }

    state = {
        //listen to request to add a key to an object
        addKeyRequest: false
    }

    //reference id for this instance
    rjvId = Date.now().toString()

    //all acceptable props and default values
    defaults = {
        src: {},
        name: 'root',
        theme: 'rjv-default',
        collapsed: false,
        collapseStringsAfterLength: false,
        indentWidth: 4,
        enableClipboard: true,
        displayObjectSize: true,
        displayDataTypes: true,
        onEdit: false,
        onDelete: false,
        onAdd: false
    }

    getListeners = () => {
        return {
            'reset': this.resetState,
            'variable-update': this.updateSrc,
            'add-key-request': this.addKeyRequest
        }
    }

    componentWillMount() {
        const listeners = this.getListeners();
        for (const i in listeners) {
            ObjectAttributes.on(
                i + '-' + this.rjvId, listeners[i]
            )
        }
    }

    componentWillUnmount() {
        const listeners = this.getListeners();
        for (const i in listeners) {
            ObjectAttributes.removeListener(
                i + '-' + this.rjvId, listeners[i]
            )
        }
    }

    init = (props) => {
        for (let i in this.defaults) {
            if (props[i] !== undefined) {
                this.state[i] = props[i];
            } else {
                this.state[i] = this.defaults[i];
            }
        }

        this.validateInput();
    }

    //make sure props are passed in as expected
    validateInput = () => {
        //make sure theme is valid
        if (toType(this.state.theme) === 'object'
            && !isTheme(this.state.theme)
        ) {
            console.error(
                'react-json-view error:',
                'theme prop must be a theme name or valid base-16 theme object.',
                'defaulting to "rjv-default" theme'
            );
            this.state.theme = 'rjv-default';
        }

        //make sure `src` prop is valid
        if (toType(this.state.src) !== 'object'
            && toType(this.state.src) !== 'array'
        ) {
            console.error(
                'react-json-view error:',
                'src property must be a valid json object'
            );
            this.state.name = 'ERROR';
            this.state.src = {
                message: 'src property must be a valid json object'
            }
        }

        //make sure `onEdit` prop is a function when not `false`
        if (this.state.onEdit !== false
            && toType(this.state.onEdit) !== 'function'
        ) {
            this.state.onEdit = ()=>{};
            console.error(
                'react-json-view error:',
                'onEdit property must be a function when enabled'
            );
        }
    }

    render() {
        const {addKeyRequest, ...props} = this.state;
        //reset key request to false once it's observed
        this.state.addKeyRequest = false;
        return (<div class="react-json-view"
            {...Theme(props.theme, 'app-container')} >
            <JsonViewer {...props} type={toType(props.src)} rjvId={this.rjvId} />
            <AddKeyRequest active={addKeyRequest} theme={props.theme} rjvId={this.rjvId} />
        </div>);
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
        this.setState(this.state);
    }

    updateSrc = () => {
        let {
            name, namespace, new_value, existing_value,
            variable_removed, updated_src
        } = ObjectAttributes.get(
            this.rjvId, 'action', 'variable-update'
        );
        let {onEdit} = this.state;

        const on_edit_payload = {
            existing_src: this.state.src,
            updated_src: updated_src,
            name: name,
            namespace: namespace,
            existing_value: existing_value,
        }

        if (onEdit(on_edit_payload) !== false) {
            this.state.src = updated_src;
            this.setState(this.state);
        }
    }

    addKeyRequest = () => {
        this.setState({addKeyRequest: true});
    }

    resetState = () => {
        this.setState(this.state);
    }
}
