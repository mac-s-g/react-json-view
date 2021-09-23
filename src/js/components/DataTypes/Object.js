import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import { toType } from './../../helpers/util';
import dispatcher from './../../helpers/dispatcher';

//data type components
import { JsonObject } from './DataTypes';

import VariableEditor from './../VariableEditor';
import VariableMeta from './../VariableMeta';
import ArrayGroup from './../ArrayGroup';
import ObjectName from './../ObjectName';
import DragWrapper from '../DragWrapper';

import searchStringIndex from './../../helpers/searchStringIndex';
//attribute store
import AttributeStore from './../../stores/ObjectAttributes';

//icons
import { CollapsedIcon, ExpandedIcon } from './../ToggleIcons';
import { Edit } from '../icons';

//theme
import Theme from './../../themes/getStyle';
import ObjectAttributes from '../../stores/ObjectAttributes';

//increment 1 with each nested object & array
const DEPTH_INCREMENT = 1;
//single indent is 5px
const SINGLE_INDENT = 5;

class RjvObject extends React.PureComponent {
    constructor(props) {
        super(props);
        const state = RjvObject.getState(props);
        this.state = {
            ...state,
            prevProps: {},
            dropTarget: {},
            dragEnabled: true,
            hoveredOver: false
        };
    }

    componentDidMount() {
        // console.log(ObjectAttributes.get(this.props.rjvId, this.props.namespace, 'expanded', undefined));
        ObjectAttributes.on(
            'expanded-' + this.props.namespace.join(','),
            this.handleExpand
        );
    }

    componentWillUnmount() {
        ObjectAttributes.removeListener(
            'expanded-' + this.props.namespace.join(','),
            this.handleExpand
        );
    }

    handleExpand = () => {
        const isExpanded = AttributeStore.get(
            this.props.rjvId,
            this.props.namespace,
            'expanded',
            false
        );
        this.setState({
            expanded: isExpanded
        });
    };

    static getState = props => {
        const size = Object.keys(props.src).length;
        //if root then have it's default expanded value true, others false
        const expanded =
            (props.collapsed === false ||
                (props.collapsed !== true && props.collapsed > props.depth)) &&
            (!props.shouldCollapse ||
                props.shouldCollapse({
                    name: props.name,
                    src: props.src,
                    type: toType(props.src),
                    namespace: props.namespace
                }) === false) &&
            //initialize closed if object has no items
            size !== 0;
        const searchExpanded = searchStringIndex(
            JSON.stringify(props.src),
            props.search
        );
        const state = {
            expanded:
                searchExpanded > 0 ||
                AttributeStore.get(
                    props.rjvId,
                    props.namespace,
                    'expanded',
                    expanded
                ),
            object_type: props.type === 'array' ? 'array' : 'object',
            parent_type: props.type === 'array' ? 'array' : 'object',
            size,
            hovered: false
        };
        return state;
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { prevProps } = prevState;
        if (
            nextProps.src !== prevProps.src ||
            nextProps.collapsed !== prevProps.collapsed ||
            nextProps.name !== prevProps.name ||
            nextProps.namespace !== prevProps.namespace ||
            nextProps.rjvId !== prevProps.rjvId
        ) {
            const newState = RjvObject.getState(nextProps);
            return {
                ...newState,
                prevProps: nextProps
            };
        }
        return null;
    }

    toggleCollapsed = () => {
        const { rjvId, namespace, type, src } = this.props;
        const { expanded, hoveredOver } = this.state;
        const noSelection =
            window.getSelection && !window.getSelection().toString();
        if (noSelection) {
            //remove meta icons if collapsed and moved away from cursor
            if (hoveredOver && expanded) {
                this.setState({
                    hoveredOver: !hoveredOver
                });
            }
            this.setState(
                {
                    expanded: !expanded
                },
                () => {
                    AttributeStore.set(
                        rjvId,
                        namespace,
                        'expanded',
                        this.state.expanded
                    );
                }
            );

            if (type === 'array') {
                Object.keys(src).forEach(key => {
                    namespace.splice(namespace.length, 0, key);
                    AttributeStore.set(rjvId, namespace, 'expanded', !expanded);
                    namespace.splice(namespace.length - 1, 1);
                });
            }
        }
    };

    getObjectContent = (depth, src, props) => {
        const { theme } = this.props;
        return (
            <div class="pushed-content object-container">
                <div class="object-content" {...Theme(theme, 'pushed-content')}>
                    {this.renderObjectContents(src, props)}
                </div>
            </div>
        );
    };

    getEllipsis = () => {
        const { theme } = this.props;
        const { size } = this.state;

        if (size === 0) {
            //don't render an ellipsis when an object has no items
            return null;
        } else {
            return (
                <div
                    {...Theme(theme, 'ellipsis')}
                    class="node-ellipsis"
                    onClick={this.toggleCollapsed}
                >
                    ...
                </div>
            );
        }
    };

    getObjectMetaData = src => {
        const { size, hovered } = this.state;
        return hovered && <VariableMeta size={size} {...this.props} />;
    };

    updateKeyRequest = e => {
        const { name, namespace, parent_type, rjvId, depth } = this.props;
        e.stopPropagation();
        let existingValue = AttributeStore.getSrcByNamespace({
            rjvId,
            name: 'global',
            namespace: [...namespace].splice(0, namespace.length - 1),
            parent_type
        });
        dispatcher.dispatch({
            name: 'UPDATE_VARIABLE_KEY_REQUEST',
            rjvId: rjvId,
            data: {
                name: namespace[depth - 1],
                namespace: namespace.splice(0, namespace.length - 2),
                existing_value: existingValue,
                variable_removed: false,
                key_name: name
            }
        });
    };

    renderRenameKeyButton = () => {
        const { theme } = this.props;
        const { hovered } = this.state;
        return (
            hovered && (
                <span class="click-to-edit-key" title="Edit Key">
                    <Edit
                        class="click-to-edit-key-icon"
                        {...Theme(theme, 'editVarIcon')}
                        onClick={e => this.updateKeyRequest(e)}
                    />
                </span>
            )
        );
    };

    getBraceStart(object_type, expanded) {
        const { src, theme, iconStyle, parent_type, jsvRoot } = this.props;

        if (parent_type === 'array_group') {
            return (
                <span>
                    <span {...Theme(theme, 'brace')}>
                        {object_type === 'array' ? '[' : '{'}
                    </span>
                    {expanded ? this.getObjectMetaData(src) : null}
                </span>
            );
        }

        const IconComponent = expanded ? ExpandedIcon : CollapsedIcon;

        return (
            <span>
                <span
                    onClick={e => {
                        this.toggleCollapsed();
                    }}
                    {...Theme(theme, 'brace-row')}
                >
                    {parent_type !== 'array' &&
                        !jsvRoot &&
                        this.renderRenameKeyButton()}
                    <div
                        class="icon-container"
                        {...Theme(theme, 'icon-container')}
                    >
                        {!jsvRoot && (
                            <IconComponent {...{ theme, iconStyle }} />
                        )}
                    </div>
                    <ObjectName {...this.props} />
                    <span {...Theme(theme, 'brace')}>
                        {object_type === 'array' ? '[' : '{'}
                    </span>
                </span>
                {expanded ? this.getObjectMetaData(src) : null}
            </span>
        );
    }

    handleOnHover = isHovering => {
        this.setState({ hoveredOver: isHovering });
    };

    render() {
        // `indentWidth` and `collapsed` props will
        // perpetuate to children via `...rest`
        const {
            depth,
            src,
            namespace,
            name,
            type,
            parent_type,
            theme,
            jsvRoot,
            iconStyle,
            ...rest
        } = this.props;

        const { object_type, expanded } = this.state;

        let styles = {};
        if (!jsvRoot && parent_type !== 'array_group') {
            styles.paddingLeft = this.props.indentWidth * SINGLE_INDENT;
        } else if (parent_type === 'array_group') {
            styles.borderLeft = 0;
            styles.display = 'inline';
        }

        return (
            <div
                class="object-key-val"
                class="object-key-val"
                onMouseEnter={() =>
                    this.setState({ ...this.state, hovered: true })
                }
                onMouseLeave={() =>
                    this.setState({ ...this.state, hovered: false })
                }
                {...Theme(theme, jsvRoot ? 'jsv-root' : 'objectKeyVal', styles)}
            >
                {this.getBraceStart(object_type, expanded)}
                {expanded
                    ? this.getObjectContent(depth, src, {
                          theme,
                          iconStyle,
                          ...rest
                      })
                    : this.getEllipsis()}
                <span class="brace-row">
                    <span
                        style={{
                            ...Theme(theme, 'brace').style,
                            paddingLeft: expanded ? '3px' : '0px'
                        }}
                    >
                        {object_type === 'array' ? ']' : '}'}
                    </span>
                    {expanded ? null : this.getObjectMetaData(src)}
                </span>
            </div>
        );
    }

    handleDragAllow = allowToDrag => {
        this.setState({
            dragEnabled: allowToDrag
        });
    };

    renderObjectContents = (variables, props) => {
        const {
            depth,
            parent_type,
            index_offset,
            groupArraysAfterLength,
            namespace,
            src,
            type,
            sortKeys,
            rjvId
        } = this.props;
        const { object_type, dropTarget, dragEnabled } = this.state;
        let elements = [],
            variable;
        let keys = Object.keys(variables || {});
        if (sortKeys && object_type !== 'array') {
            keys = keys.sort();
        }

        keys.forEach((name, index) => {
            variable = new JsonVariable(name, variables[name]);

            if (parent_type === 'array_group' && index_offset) {
                variable.name = parseInt(variable.name) + index_offset;
            }
            if (!variables.hasOwnProperty(name)) {
                return;
            } else if (variable.type === 'object') {
                elements.push(
                    <DragWrapper
                        key={variable.name}
                        name={variable.name}
                        value={variable.value}
                        dropMarker={
                            index === keys.length - 1
                                ? 'drop-after'
                                : 'drop-before'
                        }
                        dropTarget={dropTarget}
                        depth={depth}
                        namespace={namespace}
                        rjvId={rjvId}
                        src={src}
                        dragAllowed={dragEnabled}
                        canDrop={true}
                    >
                        <JsonObject
                            key={variable.name}
                            depth={depth + DEPTH_INCREMENT}
                            name={variable.name}
                            src={variable.value}
                            type={variable.type}
                            namespace={namespace.concat(variable.name)}
                            parent_type={object_type}
                            {...props}
                        />
                    </DragWrapper>
                );
            } else if (variable.type === 'array') {
                let ObjectComponent = JsonObject;

                if (
                    groupArraysAfterLength &&
                    variable.value.length > groupArraysAfterLength
                ) {
                    ObjectComponent = ArrayGroup;
                }

                elements.push(
                    <DragWrapper
                        key={variable.name}
                        name={variable.name}
                        value={variable.value}
                        dropMarker={
                            index === keys.length - 1
                                ? 'drop-after'
                                : 'drop-before'
                        }
                        dropTarget={dropTarget}
                        depth={depth}
                        namespace={namespace}
                        rjvId={rjvId}
                        src={src}
                        dragAllowed={dragEnabled}
                        isArray={true}
                        canDrop={true}
                    >
                        <ObjectComponent
                            key={variable.name}
                            depth={depth + DEPTH_INCREMENT}
                            name={variable.name}
                            src={variable.value}
                            namespace={namespace.concat(variable.name)}
                            type="array"
                            parent_type={object_type}
                            {...props}
                        />
                    </DragWrapper>
                );
            } else {
                elements.push(
                    <DragWrapper
                        key={variable.name}
                        name={variable.name}
                        value={variable.value}
                        dropMarker={
                            index === keys.length - 1
                                ? 'drop-after'
                                : 'drop-before'
                        }
                        dropTarget={dropTarget}
                        depth={depth}
                        namespace={namespace}
                        rjvId={rjvId}
                        src={src}
                        dragAllowed={dragEnabled}
                        canDrop={true}
                    >
                        <VariableEditor
                            key={variable.name + '_' + namespace}
                            src={src}
                            variable={variable}
                            depth={depth}
                            singleIndent={SINGLE_INDENT}
                            namespace={namespace}
                            type={type}
                            parent_type={object_type}
                            isDragAllowed={this.handleDragAllow}
                            {...props}
                        />
                    </DragWrapper>
                );
            }
        });

        return elements;
    };
}

//just store name, value and type with a variable
class JsonVariable {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.type = toType(value);
    }
}

polyfill(RjvObject);

//export component
export default RjvObject;
