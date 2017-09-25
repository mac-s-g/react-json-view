import React from 'react';
import AutosizeTextarea from 'react-textarea-autosize';

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
        renameKey: false,
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
            variable, singleIndent, type, theme, namespace,
            indentWidth, onEdit, onDelete, onSelect, rjvId
        } = this.props;
        const {editMode} = this.state;

        return (
        <div {...Theme(
            theme, 'objectKeyVal',
            {paddingLeft: indentWidth * singleIndent}
        )}
        class="variable-row"
        key={variable.name}>
            {
                type == 'array'
                ? (
                <span {...Theme(theme, 'array-key')}
                key={variable.name + '_' + namespace}>
                    {variable.name}
                    <div {...Theme(theme, 'colon')}>:</div>
                </span>
                )
                : (
                <span>
                    <span {...Theme(theme, 'object-name')}
                    class="object-key"
                    key={variable.name + '_' + namespace}>
                        <span style={{verticalAlign:'top'}}>"</span>
                        <span style={{display:'inline-block'}} >{variable.name}</span>
                        <span style={{verticalAlign:'top'}}>"</span>
                    </span>
                    <span {...Theme(theme, 'colon')}>:</span>
                </span>
                )

            }
            <div class="variable-value"

            onClick={onSelect === false && onEdit === false ? undefined : (e)=>{
                let location = [...namespace]
                if (e.ctrlKey) {
                    this.prepopInput(variable);
                } else if (editMode === false) {
                    location.shift()
                    onSelect({...variable, namespace: location})
                }
            }}
            {...Theme(theme, 'variableValue', {cursor: onSelect === false ? 'default' : 'pointer'})}>
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
        <div class="click-to-edit" style={{verticalAlign: 'top'}}>
            <Edit
            class="click-to-edit-icon"
            {...Theme(theme, 'editVarIcon')}
            onClick={() => {this.prepopInput(variable)}}
            />
        </div>
        );
    }

    prepopInput = (variable) => {
        let detected;
        if (this.props.onEdit !== false) {
            this.state.editMode = true;
            this.state.editValue = stringifyVariable(variable.value);
            detected = parseInput(this.state.editValue);
            this.state.parsedInput = {
                type: detected.type,
                value: detected.value
            };
            this.setState(this.state);
        }
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
        <div class="click-to-remove" style={{verticalAlign: 'top'}}>
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
            <AutosizeTextarea type='text'
            inputRef={input => input && input.focus()}
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
            onKeyDown={(e)=>{
                switch (e.key) {
                    case 'Escape': {
                        this.setState({editMode: false, editValue: ""});
                        break;
                    }
                    case 'Enter': {
                        if (e.ctrlKey) {
                            this.submitEdit(true);
                        }
                        break;
                    }
                }
                e.stopPropagation();
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
            onClick={() => {this.submitEdit()}}
            />
            <div>
                {this.showDetected()}
            </div>
            </div>

        </div>);

    }

    submitEdit = (submit_detected) => {
        const {variable, namespace, rjvId} = this.props;
        const {editValue, parsedInput} = this.state;
        let new_value = editValue;
        if (submit_detected && parsedInput.type) {
            new_value = parsedInput.value;
        }
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
                onClick={() => {this.submitEdit(true)}}
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