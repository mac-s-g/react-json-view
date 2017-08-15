import React from 'react';

import {toType} from './../helpers/util';
import dispatcher from './../helpers/dispatcher';
import parseInput from './../helpers/parseInput';
import stringifyVariable from './../helpers/stringifyVariable';

//data type components
import {
    JsonBoolean, JsonDate, JsonFloat, JsonFunction, JsonInteger,
    JsonNan, JsonNull, JsonString, JsonUndefined
} from './DataTypes/DataTypes';

//clibboard icon
import {Edit, CheckCircle, RemoveCircle as Remove} from './icons';

//theme
import Theme from './../themes/getStyle';


class VariableEditor extends React.Component {

    state = {
        editMode: false,
        editValue: "",
        parsedInput: {
            type: false,
            value: null
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {
            variable, singleIndent, type, theme,
            namespace, indentWidth, onEdit, onDelete
        } = this.props;
        const {editMode} = this.state;

        return (
        <div {...Theme(
            theme, 'objectKeyVal', indentWidth * singleIndent
        )}
        class="variable-row"
        key={variable.name}>
            {
                type == 'array'
                ? (
                <div {...Theme(theme, 'array-key')}
                key={variable.name + '_' + namespace}>
                    {variable.name}
                    <div {...Theme(theme, 'colon')}>:</div>
                </div>
                )
                : (
                <div {...Theme(theme, 'object-name')}
                key={variable.name + '_' + namespace}>
                    <span style={{verticalAlign:'top'}}>"</span>
                    <div style={{display:'inline-block'}} >
                        {variable.name}
                    </div>
                    <span style={{verticalAlign:'top'}}>"</span>
                    <div {...Theme(theme, 'colon')}>:</div>
                </div>
                )

            }
            <div {...Theme(theme, 'variable-value')}>
                {this.getValue(variable, this.props, editMode)}
            </div>
            {onEdit !== false && editMode == false ? this.getEditIcon() : null}
            {onDelete !== false && editMode == false ? this.getRemoveIcon() : null}
        </div>
        );

    }

    getEditIcon = () => {
        const {variable, namespace, theme} = this.props;
        const {editMode} = this.state;
        let display = 'inline-block';

        if (editMode) {
            display = 'none';
        }

        return (
        <div class="click-to-edit" >
            <Edit
            class="click-to-edit-icon"
            {...Theme(theme, 'editVarIcon')}
            onClick={() => {
                let detected;
                this.state.editMode = true;
                this.state.editValue = stringifyVariable(variable.value);
                detected = parseInput(this.state.editValue);
                this.state.parsedInput = {
                    type: detected.type,
                    value: detected.value
                };
                this.setState(this.state);
            }}
            />
        </div>
        );
    }

    getRemoveIcon = () => {
        const {
            variable, namespace, theme, rjvId
        } = this.props;
        const {editMode} = this.state;
        let display = 'inline-block';

        if (editMode) {
            display = 'none';
        }

        return (
        <div class="click-to-remove" >
            <Remove
            class="click-to-remove-icon"
            {...Theme(theme, 'removeVarIcon')}
            onClick={() => {
                dispatcher.dispatch({
                    name: 'VARIABLE_REMOVED',
                    rjvId: rjvId,
                    data: {
                        name: variable.name,
                        namespace: namespace,
                        existing_value: variable.value,
                        variable_removed: true
                    },
                });
            }}
            />
        </div>
        );
    }

    getValue = (variable, props, editMode) => {
        const type = editMode ? false : variable.type;
        switch (type) {
            case false:
                return this.getEditInput();
            case 'string':
                return <JsonString value={variable.value} {...props} />;
            case 'integer':
                return <JsonInteger value={variable.value} {...props} />;
            case 'float':
                return <JsonFloat value={variable.value} {...props} />;
            case 'boolean':
                return <JsonBoolean value={variable.value} {...props} />;
            case 'function':
                return <JsonFunction value={variable.value} {...props} />;
            case 'null':
                return <JsonNull {...props} />;
            case 'nan':
                return <JsonNan {...props} />;
            case 'undefined':
                return <JsonUndefined {...props} />;
            case 'date':
                return <JsonDate value={variable.value} {...props} />;
            default:
                // catch-all for types that weren't anticipated
                return <div class="object-value" {...props} >
                    {variable.value}
                </div>;
        }
    }

    getEditInput = () => {
        const {variable, namespace, theme, rjvId} = this.props;
        const {editValue} = this.state;

        return (<div>
            <textarea type='text'
            ref={input => input && input.focus()}
            value={editValue}
            class="variable-editor"
            onChange={(event)=>{
                const value = event.target.value;
                const detected = parseInput(value);
                this.setState({
                    editValue: value,
                    parsedInput: {
                        type: detected.type,
                        value: detected.value
                    }
                });
            }}
            placeholder="update this value"
            {...Theme(theme, 'edit-input')}
            />
            <div {...Theme(theme, 'edit-icon-container')}>
            <Remove class="edit-cancel" {...Theme(theme, 'cancel-icon')}
            onClick={()=>{
                this.setState({editMode: false, editValue: ""});
            }}
            />
            <CheckCircle class="edit-check string-value"
            {...Theme(theme, 'check-icon')}
            onClick={() => {
                const new_value = (editValue);
                this.state.editMode = false;
                dispatcher.dispatch({
                    name: 'VARIABLE_UPDATED',
                    rjvId: rjvId,
                    data: {
                        name: variable.name,
                        namespace: namespace,
                        existing_value: variable.value,
                        new_value: new_value,
                        variable_removed: false
                    },
                });
            }}
            />
            <div>
                {this.showDetected()}
            </div>
            </div>

        </div>);

    }

    showDetected = () => {
        const {theme, variable, namespace, rjvId} = this.props;
        const {type, value} = this.state.parsedInput;
        const detected = this.getDetectedInput();
        if (detected) {
            return <div>
            <div {...Theme(theme, 'detected-row')}>
                {detected}
                <CheckCircle class="edit-check detected"
                style={{
                    verticalAlign: 'top',
                    paddingLeft: '3px',
                    ...Theme(theme, 'check-icon').style
                }}
                onClick={() => {
                    this.state.editMode = false;
                    dispatcher.dispatch({
                        name: 'VARIABLE_UPDATED',
                        rjvId: rjvId,
                        data: {
                            name: variable.name,
                            namespace: namespace,
                            existing_value: variable.value,
                            new_value: value,
                            variable_removed: false
                        },
                    });
                }}
                />
            </div>
            </div>;
        }
    }

    getDetectedInput = () => {
        const {parsedInput} = this.state;
        const {type, value} = parsedInput;
        const {props} = this;
        const {theme} = this.props;

        if (type !== false) {
            switch (type.toLowerCase()) {
                case 'object':
                    return <span>
                        <span style={{...Theme(theme, 'brace').style, cursor:'default'}}>{'{'}</span>
                        <span style={{...Theme(theme, 'ellipsis').style, cursor:'default'}}>...</span>
                        <span style={{...Theme(theme, 'brace').style, cursor:'default'}}>{'}'}</span>
                    </span>;
                case 'array':
                    return <span>
                        <span style={{...Theme(theme, 'brace').style, cursor:'default'}}>{'['}</span>
                        <span style={{...Theme(theme, 'ellipsis').style, cursor:'default'}}>...</span>
                        <span style={{...Theme(theme, 'brace').style, cursor:'default'}}>{']'}</span>
                    </span>;
                case 'string':
                    return <JsonString value={value} {...props} />;
                case 'integer':
                    return <JsonInteger value={value} {...props} />;
                case 'float':
                    return <JsonFloat value={value} {...props} />;
                case 'boolean':
                    return <JsonBoolean value={value} {...props} />;
                case 'function':
                    return <JsonFunction value={value} {...props} />;
                case 'null':
                    return <JsonNull {...props} />;
                case 'nan':
                    return <JsonNan {...props} />;
                case 'undefined':
                    return <JsonUndefined {...props} />;
                case 'date':
                    return <JsonDate value={new Date(value)} {...props} />;
            }
        }
    }

}

//export component
export default VariableEditor;