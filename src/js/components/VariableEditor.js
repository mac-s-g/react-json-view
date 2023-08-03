import React from 'react';
import AutosizeTextarea from 'react-textarea-autosize';

import dispatcher from './../helpers/dispatcher';
import parseInput from './../helpers/parseInput';
import stringifyVariable from './../helpers/stringifyVariable';

//data type components
import { JsonString } from './DataTypes/String';
import { JsonInteger } from './DataTypes/Integer';
import { JsonFloat } from './DataTypes/Float';
import { JsonBoolean } from './DataTypes/Boolean';
import { JsonFunction } from './DataTypes/Function';
import { JsonNull } from './DataTypes/Null';
import { JsonNan } from './DataTypes/Nan';
import { JsonUndefined } from './DataTypes/Undefined';
import { JsonDate } from './DataTypes/Date';
import { JsonRegexp } from './DataTypes/Regexp';
import { CopyToClipboard } from './CopyToClipboard';

//clibboard icon
import { Edit, CheckCircle, RemoveCircle as Remove } from './icons';

//theme
import Theme from './../themes/getStyle';

export class VariableEditor extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            editValue: '',
            hovered: false,
            renameKey: false,
            parsedInput: {
                type: false,
                value: null
            }
        };
    }

    render() {
        const {
            variable,
            singleIndent,
            type,
            theme,
            namespace,
            indentWidth,
            enableClipboard,
            onEdit,
            onDelete,
            onSelect,
            paths,
            refs,
            current,
            displayArrayKey,
            quotesOnKeys
        } = this.props;
        const { editMode } = this.state;
        const currentNamespace= [...namespace, variable.name];
        const currentPath = currentNamespace.join('.');
        const highlight = paths?.includes(currentPath);
        const isCurrent = paths[current] ===  currentPath;

        return (
            <div
                {...Theme(theme, 'objectKeyVal', {
                    paddingLeft: indentWidth * singleIndent
                })}
                onMouseEnter={() =>
                    this.setState({ ...this.state, hovered: true })
                }
                onMouseLeave={() =>
                    this.setState({ ...this.state, hovered: false })
                }
                class="variable-row"
                key={variable.name}
                ref={refs[currentPath]}
            >
                {type == 'array' ? (
                    displayArrayKey ? (
                        <span
                            {...Theme(theme, 'array-key')}
                            key={variable.name + '_' + namespace}
                        >
                            {variable.name}
                            <div {...Theme(theme, 'colon')}>:</div>
                        </span>
                    ) : null
                ) : (
                    <span>
                        <span
                            {...Theme(theme, 'object-name')}
                            class="object-key"
                            key={variable.name + '_' + namespace}
                        >
                            {!!quotesOnKeys && (
                                <span style={{ verticalAlign: 'top' }}>"</span>
                            )}
                            <span style={{ display: 'inline-block' }}>
                                {variable.name}
                            </span>
                            {!!quotesOnKeys && (
                                <span style={{ verticalAlign: 'top' }}>"</span>
                            )}
                        </span>
                        <span {...Theme(theme, 'colon')}>:</span>
                    </span>
                )}
                <div
                    class="variable-value"
                    onClick={
                        onSelect === false && onEdit === false
                            ? null
                            : e => {
                                  let location = [...namespace];
                                  if (
                                      (e.ctrlKey || e.metaKey) &&
                                      onEdit !== false
                                  ) {
                                      this.prepopInput(variable);
                                  } else if (onSelect !== false) {
                                      location.shift();
                                      onSelect({
                                          ...variable,
                                          namespace: location
                                      });
                                  }
                              }
                    }
                    {...Theme(theme, 'variableValue', {
                        cursor: onSelect === false ? 'default' : 'pointer'
                    })}
                >
                    {this.getValue(variable, editMode, highlight, isCurrent)}
                </div>
                {enableClipboard ? (
                    <CopyToClipboard
                        rowHovered={this.state.hovered}
                        hidden={editMode}
                        src={variable.value}
                        clickCallback={enableClipboard}
                        {...{ theme, namespace: currentNamespace }}
                    />
                ) : null}
                {onEdit !== false && editMode == false
                    ? this.getEditIcon()
                    : null}
                {onDelete !== false && editMode == false
                    ? this.getRemoveIcon()
                    : null}
            </div>
        );
    }

    getEditIcon = () => {
        const { variable, theme } = this.props;

        return (
            <div
                class="click-to-edit"
                style={{
                    verticalAlign: 'top',
                    display: this.state.hovered ? 'inline-block' : 'none'
                }}
            >
                <Edit
                    class="click-to-edit-icon"
                    {...Theme(theme, 'editVarIcon')}
                    onClick={() => {
                        this.prepopInput(variable);
                    }}
                />
            </div>
        );
    };

    prepopInput = variable => {
        if (this.props.onEdit !== false) {
            const stringifiedValue = stringifyVariable(variable.value);
            const detected = parseInput(stringifiedValue);
            this.setState({
                editMode: true,
                editValue: stringifiedValue,
                parsedInput: {
                    type: detected.type,
                    value: detected.value
                }
            });
        }
    };

    getRemoveIcon = () => {
        const { variable, namespace, theme, rjvId } = this.props;

        return (
            <div
                class="click-to-remove"
                style={{
                    verticalAlign: 'top',
                    display: this.state.hovered ? 'inline-block' : 'none'
                }}
            >
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
                            }
                        });
                    }}
                />
            </div>
        );
    };

    getValue = (variable, editMode, highlight, isCurrent) => {
        const type = editMode ? false : variable.type;
        const { props } = this;
        switch (type) {
            case false:
                return this.getEditInput();
            case 'string':
                return <JsonString highlight={highlight} isCurrent={isCurrent} searchResult={true} value={variable.value} {...props} />;
            case 'integer':
                return <JsonInteger highlight={highlight} isCurrent={isCurrent} value={variable.value} {...props} />;
            case 'float':
                return <JsonFloat highlight={highlight} isCurrent={isCurrent} value={variable.value} {...props} />;
            case 'boolean':
                return <JsonBoolean highlight={highlight} isCurrent={isCurrent} value={variable.value} {...props} />;
            case 'function':
                return <JsonFunction value={variable.value} isCurrent={isCurrent} {...props} />;
            case 'null':
                return <JsonNull highlight={highlight} isCurrent={isCurrent} {...props} />;
            case 'nan':
                return <JsonNan highlight={highlight} isCurrent={isCurrent} {...props} />;
            case 'undefined':
                return <JsonUndefined highlight={highlight} isCurrent={isCurrent} {...props} />;
            case 'date':
                return <JsonDate highlight={highlight} isCurrent={isCurrent} value={variable.value} {...props} />;
            case 'regexp':
                return <JsonRegexp highlight={highlight} isCurrent={isCurrent} value={variable.value} {...props} />;
            default:
                // catch-all for types that weren't anticipated
                return (
                    <div class="object-value">
                        {JSON.stringify(variable.value)}
                    </div>
                );
        }
    };

    getEditInput = () => {
        const { theme } = this.props;
        const { editValue } = this.state;

        return (
            <div>
                <AutosizeTextarea
                    type="text"
                    inputRef={input => input && input.focus()}
                    value={editValue}
                    class="variable-editor"
                    onChange={event => {
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
                    onKeyDown={e => {
                        switch (e.key) {
                            case 'Escape': {
                                this.setState({
                                    editMode: false,
                                    editValue: ''
                                });
                                break;
                            }
                            case 'Enter': {
                                if (e.ctrlKey || e.metaKey) {
                                    this.submitEdit(true);
                                }
                                break;
                            }
                        }
                        e.stopPropagation();
                    }}
                    placeholder="update this value"
                    minRows={2}
                    {...Theme(theme, 'edit-input')}
                />
                <div {...Theme(theme, 'edit-icon-container')}>
                    <Remove
                        class="edit-cancel"
                        {...Theme(theme, 'cancel-icon')}
                        onClick={() => {
                            this.setState({ editMode: false, editValue: '' });
                        }}
                    />
                    <CheckCircle
                        class="edit-check string-value"
                        {...Theme(theme, 'check-icon')}
                        onClick={() => {
                            this.submitEdit();
                        }}
                    />
                    <div>{this.showDetected()}</div>
                </div>
            </div>
        );
    };

    submitEdit = submit_detected => {
        const { variable, namespace, rjvId } = this.props;
        const { editValue, parsedInput } = this.state;
        let new_value = editValue;
        if (submit_detected && parsedInput.type) {
            new_value = parsedInput.value;
        }
        this.setState({
            editMode: false
        });
        dispatcher.dispatch({
            name: 'VARIABLE_UPDATED',
            rjvId: rjvId,
            data: {
                name: variable.name,
                namespace: namespace,
                existing_value: variable.value,
                new_value: new_value,
                variable_removed: false
            }
        });
    };

    showDetected = () => {
        const { theme, variable, namespace, rjvId } = this.props;
        const { type, value } = this.state.parsedInput;
        const detected = this.getDetectedInput();
        if (detected) {
            return (
                <div>
                    <div {...Theme(theme, 'detected-row')}>
                        {detected}
                        <CheckCircle
                            class="edit-check detected"
                            style={{
                                verticalAlign: 'top',
                                paddingLeft: '3px',
                                ...Theme(theme, 'check-icon').style
                            }}
                            onClick={() => {
                                this.submitEdit(true);
                            }}
                        />
                    </div>
                </div>
            );
        }
    };

    getDetectedInput = () => {
        const { parsedInput } = this.state;
        const { type, value } = parsedInput;
        const { props } = this;
        const { theme } = props;

        if (type !== false) {
            switch (type.toLowerCase()) {
                case 'object':
                    return (
                        <span>
                            <span
                                style={{
                                    ...Theme(theme, 'brace').style,
                                    cursor: 'default'
                                }}
                            >
                                {'{'}
                            </span>
                            <span
                                style={{
                                    ...Theme(theme, 'ellipsis').style,
                                    cursor: 'default'
                                }}
                            >
                                ...
                            </span>
                            <span
                                style={{
                                    ...Theme(theme, 'brace').style,
                                    cursor: 'default'
                                }}
                            >
                                {'}'}
                            </span>
                        </span>
                    );
                case 'array':
                    return (
                        <span>
                            <span
                                style={{
                                    ...Theme(theme, 'brace').style,
                                    cursor: 'default'
                                }}
                            >
                                {'['}
                            </span>
                            <span
                                style={{
                                    ...Theme(theme, 'ellipsis').style,
                                    cursor: 'default'
                                }}
                            >
                                ...
                            </span>
                            <span
                                style={{
                                    ...Theme(theme, 'brace').style,
                                    cursor: 'default'
                                }}
                            >
                                {']'}
                            </span>
                        </span>
                    );
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
    };
}

