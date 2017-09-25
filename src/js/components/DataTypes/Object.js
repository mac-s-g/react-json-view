import React from "react";

import {toType} from './../../helpers/util';

//data type components
import {JsonObject} from './DataTypes';

import VariableEditor from './../VariableEditor';
import VariableMeta from './../VariableMeta';

//attribute store
import AttributeStore from './../../stores/ObjectAttributes';

//icons
import {
    CircleMinus, CirclePlus,
    SquareMinus, SquarePlus,
    ArrowRight, ArrowDown
} from './../icons';

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
            display_name: (props.name ? props.name : ''),
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

    render() {
        // `indentWidth` and `collapsed` props will
        // perpetuate to children via `...rest`
        const {
            depth, src, namespace, name, type,
            parent_type, theme, jsvRoot,
            ...rest
        } = this.props;
        const {
            object_type, display_name, expanded
        } = this.state;

        //expanded/collapsed icon
        let expanded_icon, object_padding_left = 0;

        if (expanded) {
            expanded_icon = this.getExpandedIcon();
        } else {
            expanded_icon = this.getCollapsedIcon();
        }

        if (!jsvRoot) {
            object_padding_left = this.props.indentWidth * SINGLE_INDENT;
        }

        return (<div class='object-key-val'
            {...Theme(
                theme, jsvRoot ? 'jsv-root' : 'objectKeyVal', {paddingLeft: object_padding_left}
            )}
            >
            <span>
                <span onClick={(e) => {this.toggleCollapsed()}}
                    {...Theme(theme, 'brace-row')}>
                    <div class="icon-container" {...Theme(theme, 'icon-container')}>
                        {expanded_icon}
                    </div>
                    {this.getObjectName()}
                    <span {...Theme(theme, 'brace')}>
                        {object_type == 'array' ? '[' : '{'}
                    </span>
                </span>
                {expanded ? this.getObjectMetaData(src) : null}
            </span>
            {expanded
                ? this.getObjectContent(depth, src, {theme, ...rest})
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
        </div>);
    }

    renderObjectContents = (variables, props) => {
        const {depth, parent_type} = this.props;
        const {namespace, object_type} = this.state;
        let theme = props.theme;
        let elements = [], variable;

        for (let name in variables) {
            variable = new JsonVariable(name, variables[name]);
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
                elements.push(
                    <JsonObject key={variable.name}
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

    getObjectName = () => {
        const {
            parent_type, namespace, theme, jsvRoot, name
        } = this.props;
        const {display_name} = this.state;

        if (jsvRoot && (name === false || name === null)) {
            return (<span />);
        } else if (parent_type == 'array') {
            return (
                <span {...Theme(theme, 'array-key')} key={namespace}>
                    <span class="array-key">{display_name}</span>
                    <span {...Theme(theme, 'colon')}>:</span>
                </span>
            );
        } else {
            return (
                <span {...Theme(theme, 'object-name')} key={namespace}>
                    <span class="object-key">
                        <span style={{verticalAlign:'top'}}>"</span>
                        <span>{display_name}</span>
                        <span style={{verticalAlign:'top'}}>"</span>
                    </span>
                    <span {...Theme(theme, 'colon')}>:</span>
                </span>
            );
        }
    }

    getCollapsedIcon = () => {
        const {theme, iconStyle} = this.props;
        switch (iconStyle) {
            case "triangle":
                return <ArrowRight
                    {...Theme(theme, 'collapsed-icon')}
                    class="collapsed-icon"
                />
            case "square":
                return <SquarePlus
                    {...Theme(theme, 'collapsed-icon')}
                    class="collapsed-icon"
                />
            default:
                return <CirclePlus
                    {...Theme(theme, 'collapsed-icon')}
                    class="collapsed-icon"
                />
        }
    }

    getExpandedIcon = () => {
        const {theme, iconStyle} = this.props;
        switch (iconStyle) {
            case "triangle":
                return <ArrowDown
                    {...Theme(theme, 'expanded-icon')}
                    class="expanded-icon"
                />
            case "square":
                return <SquareMinus
                    {...Theme(theme, 'expanded-icon')}
                    class="expanded-icon"
                />
            default:
                return <CircleMinus
                    {...Theme(theme, 'expanded-icon')}
                    class="expanded-icon"
                />
        }
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