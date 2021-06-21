import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import { toType, isTheme, searchJson, debounced, jsonFlatPaths } from './helpers/util';
import ObjectAttributes from './stores/ObjectAttributes';

//global theme
import Theme from './themes/getStyle';
import { ValidationFailure } from './components/ValidationFailure';
import { AddKeyRequest } from './components/ObjectKeyModal/AddKeyRequest';
import { JsonViewer } from './components/JsonViewer';

//forward src through to JsonObject component
class ReactJsonView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //listen to request to add/edit a key to an object
            addKeyRequest: false,
            editKeyRequest: false,
            validationFailure: false,
            paths: [],
            refs: {},
            current: 0,
            src: ReactJsonView.defaultProps.src,
            searchable: ReactJsonView.defaultProps.searchable,
            name: ReactJsonView.defaultProps.name,
            theme: ReactJsonView.defaultProps.theme,
            validationMessage: ReactJsonView.defaultProps.validationMessage,
            // the state object also needs to remember the prev prop values, because we need to compare
            // old and new props in getDerivedStateFromProps().
            prevSrc: ReactJsonView.defaultProps.src,
            prevName: ReactJsonView.defaultProps.name,
            prevTheme: ReactJsonView.defaultProps.theme
        };
    }

    //reference id for this instance
    rjvId = Date.now().toString();

    //all acceptable props and default values
    static defaultProps = {
        src: {},
        name: 'root',
        theme: 'rjv-default',
        collapsed: false,
        collapseStringsAfterLength: false,
        shouldCollapse: false,
        sortKeys: false,
        quotesOnKeys: true,
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
        displayArrayKey: true,
        searchable: false
    };

    // will trigger whenever setState() is called, or parent passes in new props.
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.src !== prevState.prevSrc ||
            nextProps.name !== prevState.prevName ||
            nextProps.theme !== prevState.prevTheme
        ) {
            // if we pass in new props, we re-validate
            const allPaths = jsonFlatPaths(nextProps.src, nextProps.name);
            const refs = allPaths.reduce((acc, value) => {
                acc[value] = React.createRef();
                return acc;
            }, {});

            const newPartialState = {
                src: nextProps.src,
                refs: refs,
                name: nextProps.name,
                theme: nextProps.theme,
                validationMessage: nextProps.validationMessage,
                prevSrc: nextProps.src,
                prevName: nextProps.name,
                prevTheme: nextProps.theme,
                searchable: nextProps.searchable
            };
            return ReactJsonView.validateState(newPartialState);
        }
        return null;
    }

    componentDidMount() {
        // initialize
        ObjectAttributes.set(this.rjvId, 'global', 'src', this.state.src);
        // bind to events
        const listeners = this.getListeners();
        for (const i in listeners) {
            ObjectAttributes.on(i + '-' + this.rjvId, listeners[i]);
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
        if (prevState.current !== this.state.current && this.state.paths.length) {
            console.log(this.state.paths[this.state.current]);
            this.state.refs[this.state.paths[this.state.current]].current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
        if (prevProps.src !== this.state.src) {
            ObjectAttributes.set(this.rjvId, 'global', 'src', this.state.src);
        }
    }

    componentWillUnmount() {
        const listeners = this.getListeners();
        for (const i in listeners) {
            ObjectAttributes.removeListener(i + '-' + this.rjvId, listeners[i]);
        }
    }

    getListeners = () => {
        return {
            reset: this.resetState,
            'variable-update': this.updateSrc,
            'add-key-request': this.addKeyRequest
        };
    };
    //make sure props are passed in as expected
    static validateState = state => {
        const validatedState = {};
        //make sure theme is valid
        if (toType(state.theme) === 'object' && !isTheme(state.theme)) {
            console.error(
                'react-json-view error:',
                'theme prop must be a theme name or valid base-16 theme object.',
                'defaulting to "rjv-default" theme'
            );
            validatedState.theme = 'rjv-default';
        }
        //make sure `src` prop is valid
        if (toType(state.src) !== 'object' && toType(state.src) !== 'array') {
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
    };

    setPaths = debounced(searchTerm =>  {
        const paths = searchJson(this.state.src, searchTerm, this.state.name)
        this.setState({
            paths,
            current: paths.length && 0
        })
    }, 300)

    handleSearch(e) {
        this.setPaths(e.target.value);
    }

    handleDown = () => {
        const expectedIndex = this.state.current + 1;
        this.setState({
            current:  expectedIndex >= this.state.paths.length ? 0: expectedIndex,
        })
    }

    handleUp = () => {
        const expectedIndex = this.state.current - 1;
        this.setState({
            current:  expectedIndex < 0 ? this.state.paths.length - 1: expectedIndex,
        })
    }

    render() {
        const {
            validationFailure,
            validationMessage,
            addKeyRequest,
            theme,
            src,
            name,
            paths,
            searchable,
            refs,
            current,
        } = this.state;

        const { style, defaultValue } = this.props;

        return (
            <div
                class="react-json-view"
                style={{ ...Theme(theme, 'app-container').style, ...style }}
            >
                <ValidationFailure
                    message={validationMessage}
                    active={validationFailure}
                    theme={theme}
                    rjvId={this.rjvId}
                />

                {searchable && <div style={{float: 'right', position: 'sticky', top: '50px'}}>
                    <div style={{display: 'flex'}}>
                        <div style={{marginRight: '10px', alignSelf: 'center'}}>{Boolean(paths.length) && `${current + 1} of ${paths.length}`}</div>
                        <input type='text' onChange={e => this.handleSearch(e)} />
                        <button onClick={this.handleUp}>▲</button>
                        <button onClick={this.handleDown}>▼</button>
                    </div>
                </div>}

                <JsonViewer
                    {...this.props}
                    refs={refs}
                    current={current}
                    src={src}
                    paths={paths}
                    name={name}
                    theme={theme}
                    type={toType(src)}
                    rjvId={this.rjvId}
                />
                <AddKeyRequest
                    active={addKeyRequest}
                    theme={theme}
                    rjvId={this.rjvId}
                    defaultValue={defaultValue}
                />
            </div>
        );
    }

    updateSrc = () => {
        const {
            name,
            namespace,
            new_value,
            existing_value,
            variable_removed,
            updated_src,
            type
        } = ObjectAttributes.get(this.rjvId, 'action', 'variable-update');
        const { onEdit, onDelete, onAdd } = this.props;

        const { src } = this.state;

        let result;

        const on_edit_payload = {
            existing_src: src,
            new_value: new_value,
            updated_src: updated_src,
            name: name,
            namespace: namespace,
            existing_value: existing_value
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
    };

    addKeyRequest = () => {
        this.setState({
            addKeyRequest: true
        });
    };

    resetState = () => {
        this.setState({
            validationFailure: false,
            addKeyRequest: false
        });
    };
}

polyfill(ReactJsonView);

export default ReactJsonView;
