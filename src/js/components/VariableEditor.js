import React from 'react';

import {toType} from './../helpers/util';
import dispatcher from './../helpers/dispatcher';
import parseInput from './../helpers/parseInput';

//data type components
import {
    JsonBoolean, JsonDate, JsonFloat, JsonFunction, JsonInteger,
    JsonNan, JsonNull, JsonString, JsonUndefined
} from './DataTypes/DataTypes';

//clibboard icon
import EditIcon from 'react-icons/lib/fa/edit';
import CheckCircle from 'react-icons/lib/fa/check-circle';
import Cancel from 'react-icons/lib/fa/times-circle';
import Remove from 'react-icons/lib/fa/times-circle';

//tooltip component
import ReactTooltip from 'react-tooltip';

//theme
import Theme from './../themes/getStyle';
import Radium from 'radium';

@Radium
class VariableEditor extends React.Component {

    state = {
        hover: false,
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

    componentDidMount() {
        ReactTooltip.rebuild();
    }

    render() {
        const {
            variable, singleIndent, type, theme,
            namespace, indentWidth, onEdit, onDelete
        } = this.props;
        const {hover, editMode} = this.state;

        return (
        <div {...Theme(
            theme, 'objectKeyVal', indentWidth * singleIndent
        )}
        onMouseEnter={()=>{this.setHover(true)}}
        onMouseLeave={()=>{this.setHover(false)}}
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
            {onEdit !== false ? this.getEditIcon(hover) : null}
            {onDelete !== false ? this.getRemoveIcon(hover) : null}
        </div>
        );

    }

    getEditIcon = (hover) => {
        const {variable, namespace, theme} = this.props;
        const {editMode} = this.state;
        const tooltip_id = variable.name + '_'
            + namespace + '-edit-tooltip';
        let display = 'inline-block';

        if (editMode) {
            display = 'none';
        }

        return (
        <div
        class="click-to-edit"
        style={{verticalAlign: 'top', display:display}}
        data-tip='edit this value'
        data-for={tooltip_id} >
            <ReactTooltip
            effect="solid"
            id={tooltip_id}
            place="right"
            delayShow={1000} />
            <EditIcon
            class="click-to-edit-icon"
            {...Theme(theme, 'editVarIcon', hover)}
            onClick={() => {
                this.state.editMode = true;
                this.setState(this.state);
            }}
            />
        </div>
        );
    }

    getRemoveIcon = (hover) => {
        const {
            variable, namespace, theme, rjvId
        } = this.props;
        const {editMode} = this.state;
        let display = 'inline-block';

        if (editMode) {
            display = 'none';
        }

        return (
        <div
        class="click-to-remove"
        style={{verticalAlign: 'top', display:display}}>
            <Remove
            class="click-to-remove-icon"
            {...Theme(theme, 'removeVarIcon', hover)}
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

    setHover = (hover) => {
        this.state.hover = hover;
        this.setState(this.state);
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
            <Cancel class="edit-cancel" {...Theme(theme, 'cancel-icon')}
            onClick={()=>{
                this.setState({editMode: false, editValue: ""});
            }}
            />
            <CheckCircle class="edit-check" {...Theme(theme, 'check-icon')}
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
                <CheckCircle class="edit-check"
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