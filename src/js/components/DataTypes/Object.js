import React from "react";

import {toType} from './../../helpers/util';

//data type components
import {JsonObject} from './DataTypes';

import VariableEditor from './../VariableEditor';
import VariableMeta from './../VariableMeta';

//attribute store
import AttributeStore from './../../stores/ObjectAttributes';

//icons
import CirclePlus from 'react-icons/lib/md/add-circle-outline';
import CircleMinus from 'react-icons/lib/md/remove-circle-outline';

//theme
import Theme from './../../themes/getStyle';
import Radium from 'radium';

//increment 1 with each nested object & array
const DEPTH_INCREMENT = 1
//single indent is 5px
const SINGLE_INDENT = 5;


@Radium
class rjvObject extends React.Component {

    constructor(props) {
        super(props);
        this.init(props);
    }

    state = {}

    init = (props) => {
        const state = {
            rjvId: props.rjvId,
            state_key: props.namespace.join('.'),
            namespace: props.namespace,
            indentWidth: props.indentWidth,
            expanded: props.jsvRoot
                ? !props.collapsed
                : AttributeStore.get(
                    props.rjvId,
                    props.namespace,
                    'expanded',
                    !props.collapsed
                ),
            object_type: (props.type == 'array' ? 'array' : 'object'),
            parent_type: (props.type == 'array' ? 'array' : 'object'),
            display_name: (props.name ? props.name : ''),
            hover: false
        }

        this.state = {...this.state, ...state};
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
        this.setState(this.state);
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

    getElipsis = () => {
        return (
            <div {...Theme(this.props.theme, 'elipsis')}
            onClick={this.toggleCollapsed}>
                ...
            </div>
        );
    }

    getObjectMetaData = (src) => {
        const size = Object.keys(src).length;
        const {hover} = this.state;
        const {rjvId, theme} = this.props;
        return (
            <VariableMeta size={size} hover={hover} {...this.props}/>
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
            expanded_icon = <CircleMinus
                {...Theme(theme, 'expanded-icon')}
                class="expanded-icon"
            />
        } else {
            expanded_icon = <CirclePlus
                {...Theme(theme, 'collapsed-icon')}
                class="collapsed-icon"
            />
        }

        if (!jsvRoot) {
            object_padding_left = this.props.indentWidth * SINGLE_INDENT;
        }


        return (<div class='object-key-val'
            {...Theme(
                theme, jsvRoot ? 'jsv-root' : 'objectKeyVal', object_padding_left
            )}
            onMouseEnter={()=>{this.setHover(true)}}
            onMouseLeave={()=>{this.setHover(false)}}
            >
            <span>
                <span onClick={this.toggleCollapsed} {...Theme(theme, 'brace-row')}>
                    <div class="icon-container" {...Theme(theme, 'icon-container')}>
                        {expanded_icon}
                    </div>
                    {
                    parent_type == 'array'
                    ? <span {...Theme(theme, 'array-key')} key={namespace}>
                        {display_name}
                    </span>
                    : <span {...Theme(theme, 'object-name')} key={namespace}>
                        <span style={{verticalAlign:'top'}}>"</span>
                        <div style={{display:'inline-block'}} >
                            {display_name}
                        </div>
                        <span style={{verticalAlign:'top'}}>"</span>
                    </span>
                    }
                    <span {...Theme(theme, 'colon')}>:</span>
                    <span {...Theme(theme, 'brace')}>
                        {object_type == 'array' ? '[' : '{'}
                    </span>
                </span>
                {expanded ? this.getObjectMetaData(src) : null}
            </span>
            {expanded
                ? this.getObjectContent(depth, src, {theme, ...rest})
                : this.getElipsis()
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
                    {...props}/>
                );
            }
        }
        return elements;

    }

    setHover = (hover) => {
        this.state.hover = hover;
        this.setState(this.state);
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