import React from 'react';
import {polyfill} from 'react-lifecycles-compat';
import JsonViewer from './components/JsonViewer';
import AddKeyRequest from './components/ObjectKeyModal/AddKeyRequest';
import ValidationFailure from './components/ValidationFailure';
import {toType, isTheme} from './helpers/util';
import ObjectAttributes from './stores/ObjectAttributes';

//global theme
import Theme from './themes/getStyle';

//forward src through to JsonObject component
class ReactJsonView extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            //listen to request to add/edit a key to an object
            addKeyRequest: false,
            editKeyRequest: false,
            validationFailure: false,
            src: ReactJsonView.defaultProps.src,
            name: ReactJsonView.defaultProps.name,
            theme: ReactJsonView.defaultProps.theme,
            validationMessage: ReactJsonView.defaultProps.validationMessage,
            // the state object also needs to remember the prev prop values, because we need to compare
            // old and new props in getDerivedStateFromProps().
            prevSrc: ReactJsonView.defaultProps.src,
            prevName: ReactJsonView.defaultProps.name,
            prevTheme: ReactJsonView.defaultProps.theme,
        };
    }

    //reference id for this instance
    rjvId = Date.now().toString()

    //all acceptable props and default values
    static defaultProps = {
        src: {},
        name: 'root',
        theme: 'rjv-default',
        collapsed: false,
        collapseStringsAfterLength: false,
        shouldCollapse: false,
        sortKeys: false,
        groupArraysAfterLength: 100,
        indentWidth: 4,
        enableClipboard: true,
        displayObjectSize: true,
        displayDataTypes: true,
        onEdit: false,
        onDelete: false,
        onAdd: false,
        onSelect: false,
        iconStyle: 'triangle',
        style: {},
        validationMessage: 'Validation Error',
        defaultValue: null,
    }

    // will trigger whenever setState() is called, or parent passes in new props.
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.src !== prevState.prevSrc ||
            nextProps.name !== prevState.prevName ||
            nextProps.theme !== prevState.prevTheme
        ) {
            // if we pass in new props, we re-validate
            const newPartialState = {
                src: nextProps.src,
                name: nextProps.name,
                theme: nextProps.theme,
                validationMessage: nextProps.validationMessage,
                prevSrc: nextProps.src,
                prevName: nextProps.name,
                prevTheme: nextProps.theme
            };
            return ReactJsonView.validateState(newPartialState);
        }
        return null;
    }

    componentDidMount() {
        // initialize
        ObjectAttributes.set(
            this.rjvId,
            'global',
            'src',
            this.state.src
        );
        // bind to events
        const listeners = this.getListeners();
        for (const i in listeners) {
            ObjectAttributes.on(
                i + '-' + this.rjvId, listeners[i]
            );
        }
        //reset key request to false once it's observed
        this.setState({
            addKeyRequest: false,
            editKeyRequest: false
        });
    }

    componentDidUpdate(prevProps, prevState) {
        //reset key request to false once it's observed
        if (prevState.addKeyRequest !== false) {
            this.setState({
                addKeyRequest: false
            });
        }
        if (prevState.editKeyRequest !== false) {
            this.setState({
                editKeyRequest: false
            });
        }
        if (prevProps.src !== this.state.src) {
            ObjectAttributes.set(
                this.rjvId,
                'global',
                'src',
                this.state.src
            );
        }
    }

    componentWillUnmount() {
        const listeners = this.getListeners();
        for (const i in listeners) {
            ObjectAttributes.removeListener(
                i + '-' + this.rjvId, listeners[i]
            );
        }
    }

    getListeners = () => {
        return {
            'reset': this.resetState,
            'variable-update': this.updateSrc,
            'add-key-request': this.addKeyRequest
        };
    }
    //make sure props are passed in as expected
    static validateState = (state) => {
        const validatedState = {};
        //make sure theme is valid
        if (toType(state.theme) === 'object'
            && !isTheme(state.theme)
        ) {
            console.error(
                'react-json-view error:',
                'theme prop must be a theme name or valid base-16 theme object.',
                'defaulting to "rjv-default" theme'
            );
            validatedState.theme = 'rjv-default';
        }
        //make sure `src` prop is valid
        if (toType(state.src) !== 'object'
            && toType(state.src) !== 'array'
        ) {
            console.error(
                'react-json-view error:',
                'src property must be a valid json object'
            );
            validatedState.name = 'ERROR';
            validatedState.src = {
                message: 'src property must be a valid json object'
            };
        }
        return {
            // get the original state
            ...state,
            // override the original state
            ...validatedState
        };
    }

    render() {
        const {
            validationFailure,
            validationMessage,
            addKeyRequest,
            theme,
            src,
            name
        } = this.state;

        const { style, defaultValue } = this.props;

        return (
            <div
                class="react-json-view"
                style={{...Theme(theme, 'app-container').style, ...style}}
            >
                <ValidationFailure
                    message={validationMessage}
                    active={validationFailure}
                    theme={theme}
                    rjvId={this.rjvId} />
                <JsonViewer
                    {...this.props}
                    src={src}
                    name={name}
                    theme={theme}
                    type={toType(src)}
                    rjvId={this.rjvId} />
                <AddKeyRequest
                    active={addKeyRequest}
                    theme={theme}
                    rjvId={this.rjvId}
                    defaultValue={defaultValue} />
            </div>
        );
    }

    updateSrc = () => {
        const {
            name, namespace, new_value, existing_value,
            variable_removed, updated_src, type
        } = ObjectAttributes.get(
            this.rjvId, 'action', 'variable-update'
        );
        const { onEdit, onDelete, onAdd } = this.props;

        const { src } = this.state;

        let result;

        const on_edit_payload = {
            existing_src: src,
            new_value: new_value,
            updated_src: updated_src,
            name: name,
            namespace: namespace,
            existing_value: existing_value,
        };

        switch (type) {
        case 'variable-added':
            result = onAdd(on_edit_payload);
            break;
        case 'variable-edited':
            result = onEdit(on_edit_payload);
            break;
        case 'variable-removed':
            result = onDelete(on_edit_payload);
            break;
        }

        if (result !== false) {
            ObjectAttributes.set(this.rjvId, 'global', 'src', updated_src);
            this.setState({
                src: updated_src
            });
        } else {
            this.setState({
                validationFailure: true
            });
        }
    }

    addKeyRequest = () => {
        this.setState({
            addKeyRequest: true
        });
    }

    resetState = () => {
        this.setState({
            validationFailure: false,
            addKeyRequest: false
        });
    }
}

polyfill(ReactJsonView);

export default ReactJsonView;
