import React from 'react';
import JsonViewer from './components/JsonViewer';
import AddKeyRequest from './components/ObjectKeyModal/AddKeyRequest';
import ValidationFailure from './components/ValidationFailure';
import {toType, isTheme} from './helpers/util';
import ObjectAttributes from './stores/ObjectAttributes';

//global theme
import Theme from './themes/getStyle';

//some style behavior requires css
import './../style/scss/global.scss';

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
        //listen to request to add/edit a key to an object
        addKeyRequest: false,
        validationFailure: false
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
        shouldCollapse: false,
        groupArraysAfterLength: 100,
        indentWidth: 4,
        enableClipboard: true,
        displayObjectSize: true,
        displayDataTypes: true,
        onEdit: false,
        onDelete: false,
        onAdd: false,
        onSelect: false,
        onMouseEnter: false,
        onMouseLeave: false,
        iconStyle: "triangle",
        style: {},
        validationMessage: "Validation Error"
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

        ObjectAttributes.set(
            this.rjvId,
            'global',
            'src',
            this.state.src
        );
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
    }

    render() {
        const {
            validationFailure, validationMessage,
            addKeyRequest, style, ...props
        } = this.state;
        //reset key request to false once it's observed
        this.state.addKeyRequest = false;
        this.state.editKeyRequest = false;
        return (<div class="react-json-view"
            style={{...Theme(props.theme, 'app-container').style, ...style}} >
            <ValidationFailure
                message={validationMessage}
                active={validationFailure}
                theme={props.theme}
                rjvId={this.rjvId} />
            <JsonViewer
                {...props}
                type={toType(props.src)}
                rjvId={this.rjvId} />
            <AddKeyRequest
                active={addKeyRequest}
                theme={props.theme}
                rjvId={this.rjvId} />
        </div>);
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
        this.setState(this.state);
    }

    updateSrc = () => {
        let {
            name, namespace, new_value, existing_value,
            variable_removed, updated_src, type
        } = ObjectAttributes.get(
            this.rjvId, 'action', 'variable-update'
        );
        let {onEdit, onDelete, onAdd} = this.state;
        let result;

        const on_edit_payload = {
            existing_src: this.state.src,
            new_value: new_value,
            updated_src: updated_src,
            name: name,
            namespace: namespace,
            existing_value: existing_value,
        }

        switch (type) {
            case 'variable-added':
                result = onAdd(on_edit_payload);
                break;
            case 'variable-edited':
                result = onEdit(on_edit_payload);
                break;
            case 'variable-removed':
                result = onDelete(on_edit_payload);
                break
        }

        if (result !== false) {
            ObjectAttributes.set(this.rjvId, 'global', 'src', updated_src);
            this.state.src = updated_src;
        } else {
            this.state.validationFailure = true;
        }
        this.setState(this.state);
    }

    addKeyRequest = () => {
        this.setState({addKeyRequest: true});
    }

    resetState = () => {
        this.state.validationFailure = false;
        this.setState(this.state);
    }
}
