import React from "react";

import {toType} from './../../helpers/util';
import {
    JsonBoolean, JsonFloat, JsonFunction, JsonInteger,
    JsonNan, JsonNull, JsonObject, JsonString
} from './DataTypes';
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

        this.state.expanded = AttributeStore.get(
            this.state.rjvId,
            this.state.state_key,
            'expanded',
            !this.props.collapsed
        );
    }

    state = {
        rjvId: this.props.rjvId,
        state_key: this.props.namespace.join('.'),
        namespace: this.props.namespace,
        indentWidth: this.props.indentWidth,
        expanded: null, //set in constructor
        object_type: (this.props.type == 'array' ? 'array' : 'object'),
        parent_type: (this.props.type == 'array' ? 'array' : 'object'),
        display_name: (this.props.name ? this.props.name : '')
    }

    toggleCollapsed = () => {
        this.state.expanded = !this.state.expanded;
        AttributeStore.set(
            this.state.rjvId,
            this.state.state_key,
            'expanded',
            this.state.expanded
        );
        this.setState(this.state);
    }

    getObjectContent = (depth, src, props) => {
        const {indentWidth} = this.state;
        return (<div class="pushed-content object-container">
            <div class="object-content"
            style={{marginLeft:(indentWidth*SINGLE_INDENT + "px")}}>
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
        const {rjvId, theme} = this.props;
        const props = {size, rjvId, theme, src};
        return (
            <VariableMeta {...props}/>
        );
    }

    render() {
        // `indentWidth` and `collapsed` props will
        // perpetuate to children via `...rest`
        const {
            depth, src, namespace, name, type, parent_type, theme, jsvRoot,
            ...rest
        } = this.props;
        const {
            object_type, display_name, expanded
        } = this.state;
        //expanded/collapsed icon
        let expanded_icon;
        if (expanded) {
            expanded_icon = <CircleMinus {...Theme(theme, 'expanded-icon')} />
        } else {
            expanded_icon = <CirclePlus {...Theme(theme, 'collapsed-icon')} />
        }

        return (<div {...Theme(theme, jsvRoot ? 'jsv-root' : 'object-key-val')}>
            <span>
                <span onClick={this.toggleCollapsed} {...Theme(theme, 'brace-row')}>
                    <span class="icon-container">{expanded_icon}</span>
                    {
                    parent_type == 'array'
                    ? <span {...Theme(theme, 'array-key')} key={namespace}>
                        {display_name}
                    </span>
                    : <span {...Theme(theme, 'object-name')} key={namespace}>
                        "{display_name}"
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
                <span {...Theme(theme, 'brace')} >
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
            if (variable.type == 'object') {
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
                <div {...Theme(props.theme, 'object-key-val')}
                key={variable.name}>
                    {
                        this.props.type == 'array'
                        ? (
                        <div {...Theme(props.theme, 'array-key')}
                        key={variable.name + '_' + namespace}>
                            {variable.name}
                            <div {...Theme(props.theme, 'colon')}>:</div>
                        </div>
                        )
                        : (
                        <div {...Theme(props.theme, 'object-name')}
                        key={variable.name + '_' + namespace}>
                            "{variable.name}"
                            <div {...Theme(props.theme, 'colon')}>:</div>
                        </div>
                        )

                    }
                    {getValue(variable, props)}
                </div>
                );
            }
        }
        return elements;

        function getValue(variable, props) {
            switch (variable.type) {
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
                default:
                    //catch-all for types that weren't anticipated
                    return <div class="object-value" {...props} >
                        {variable.value}
                    </div>;
            }
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