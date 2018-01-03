import React from "react";

import {toType} from './../../helpers/util';

//data type components
import {JsonObject} from './DataTypes';

import VariableEditor from './../VariableEditor';
import VariableMeta from './../VariableMeta';
import ArrayGroup from './../ArrayGroup'
import ObjectName from './../ObjectName'
import VariableRow from "./../VariableRow";

//attribute store
import AttributeStore from './../../stores/ObjectAttributes';

//icons
import { CollapsedIcon, ExpandedIcon } from './../ToggleIcons';

//theme
import Theme from './../../themes/getStyle';

//increment 1 with each nested object & array
const DEPTH_INCREMENT = 1
//single indent is 5px
const SINGLE_INDENT = 5;


class rjvObject extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initializeState(props);
    }

    state = {}

    initializeState = (props) => {
        const size = Object.keys(props.src).length;
        const expanded = (
            (
                props.collapsed === false
                || (props.collapsed !== true
                && props.collapsed > props.depth)
            )
            && (
                !props.shouldCollapse
                || props.shouldCollapse({
                    name: props.name,
                    src: props.src,
                    type: toType(props.src),
                    namespace: props.namespace
                }) === false
            )
            //initialize closed if object has no items
            && size !== 0
        );
        const state = {
            rjvId: props.rjvId,
            state_key: props.namespace.join('.'),
            namespace: props.namespace,
            indentWidth: props.indentWidth,
            expanded: AttributeStore.get(
                props.rjvId,
                props.namespace,
                'expanded',
                expanded
            ),
            object_type: (props.type == 'array' ? 'array' : 'object'),
            parent_type: (props.type == 'array' ? 'array' : 'object'),
            size: size
        }

        return {...this.state, ...state};
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.initializeState(nextProps));
    }

    toggleCollapsed = () => {
        this.state.expanded = !this.state.expanded;
        AttributeStore.set(
            this.state.rjvId,
            this.state.namespace,
            'expanded',
            this.state.expanded
        );

        this.setState(this.state);
    }

    getObjectContent = (depth, src, props) => {
        return (<div class="pushed-content object-container">
            <div class="object-content"
            {...Theme(this.props.theme, 'pushed-content')} >
                {this.renderObjectContents(src, props)}
            </div>
        </div>);
    }

    getEllipsis = () => {
        const {size} = this.state;

        if (size === 0) {
            //don't render an ellipsis when an object has no items
            return null
        } else {
            return (
                <div {...Theme(this.props.theme, 'ellipsis')}
                class="node-ellipsis"
                onClick={this.toggleCollapsed}>
                    ...
                </div>
            )
        }
    }

    getObjectMetaData = (src) => {
        const {rjvId, theme} = this.props;
        const {size} = this.state;
        return (
            <VariableMeta size={size} {...this.props}/>
        );
    }

    getBraceStart(object_type, expanded) {
        const {
            src, theme, iconStyle, parent_type
        } = this.props

        if (parent_type == 'array_group') {
            return (
                <span>
                    <span {...Theme(theme, 'brace')}>
                        {object_type == 'array' ? '[' : '{'}
                    </span>
                    {expanded ? this.getObjectMetaData(src) : null}
                </span>
            )
        }

        const IconComponent = expanded ? ExpandedIcon : CollapsedIcon

        return (
            <span>
                <span onClick={(e) => {this.toggleCollapsed()}}
                    {...Theme(theme, 'brace-row')}>
                    <div class="icon-container" {...Theme(theme, 'icon-container')}>
                        <IconComponent {...{theme, iconStyle}}/>
                    </div>
                    <ObjectName {...this.props} />
                    <span {...Theme(theme, 'brace')}>
                        {object_type == 'array' ? '[' : '{'}
                    </span>
                </span>
                {expanded ? this.getObjectMetaData(src) : null}
            </span>
        )
    }

    render() {
        // `indentWidth` and `collapsed` props will
        // perpetuate to children via `...rest`
        const {
            depth, src, namespace, name, type,
            parent_type, theme, jsvRoot, iconStyle,
            ...rest
        } = this.props;

        const {
            object_type, expanded
        } = this.state;

        let styles = {};
        if (!jsvRoot && parent_type !== 'array_group') {
            styles.paddingLeft = this.props.indentWidth * SINGLE_INDENT;
        } else if (parent_type === 'array_group') {
            styles.borderLeft = 0;
            styles.display = 'inline';
        }

        return (
            <VariableRow
                {...this.props}
                class='object-key-val'
                {...Theme(
                    theme, jsvRoot ? 'jsv-root' : 'objectKeyVal', styles
                )}
                variable={new JsonVariable(name, src)}
                >
                {this.getBraceStart(object_type, expanded)}
                {expanded
                    ? this.getObjectContent(depth, src, {theme, iconStyle, ...rest})
                    : this.getEllipsis()
                }
                <span class="brace-row">
                    <span style={{
                        ...Theme(theme, 'brace').style,
                        paddingLeft:(expanded ? '3px' : '0px')
                    }} >
                        {object_type == 'array' ? ']' : '}'}
                    </span>
                    {expanded ? null : this.getObjectMetaData(src)}
                </span>
            </VariableRow>
        );
    }

    renderObjectContents = (variables, props) => {
        const {depth, parent_type, index_offset, groupArraysAfterLength} = this.props;
        const {namespace, object_type} = this.state;
        let theme = props.theme;
        let elements = [], variable;

        for (let name in variables) {
            variable = new JsonVariable(name, variables[name]);

            if (parent_type == 'array_group' && index_offset) {
                variable.name = parseInt(variable.name) + index_offset
            }
            if (!variables.hasOwnProperty(name)) {
                continue;
            } else if (variable.type == 'object') {
                elements.push(
                    <JsonObject key={variable.name}
                        depth={depth + DEPTH_INCREMENT}
                        name={variable.name}
                        src={variable.value}
                        namespace={namespace.concat(variable.name)}
                        parent_type={object_type}
                        {...props}
                    />);
            } else if (variable.type == 'array') {
                let ObjectComponent = JsonObject

                if (groupArraysAfterLength && variable.value.length > groupArraysAfterLength) {
                    ObjectComponent = ArrayGroup
                }

                elements.push(
                    <ObjectComponent key={variable.name}
                        depth={depth + DEPTH_INCREMENT}
                        name={variable.name}
                        src={variable.value}
                        namespace={namespace.concat(variable.name)}
                        type="array"
                        parent_type={object_type}
                        {...props}
                    />);
            } else {
                elements.push(
                    <VariableEditor
                        key={variable.name + '_' + namespace}
                        variable={variable}
                        singleIndent={SINGLE_INDENT}
                        namespace={namespace}
                        type={this.props.type}
                        {...props}
                    />
                );
            }
        }
        return elements;
    }
}

//just store name, value and type with a variable
class JsonVariable {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.type = toType(value);
    }
}

//export component
export default rjvObject;