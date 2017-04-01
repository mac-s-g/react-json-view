import React from "react";

import {toType} from './../../helpers/util';
import {
    JsonArray, JsonBoolean, JsonFunction, JsonNan,
    JsonNull, JsonNumber, JsonObject, JsonString
} from './DataTypes';
import VariableMeta from './../VariableMeta';

//icons
import CirclePlus from 'react-icons/lib/md/add-circle-outline';
import CircleMinus from 'react-icons/lib/md/remove-circle-outline';

const DEPTH_OFFSET = 1

export default class extends React.Component {
    state = {
        expanded: this.props.expanded === false ? false : true
    }

    renderPush = (depth) => {
        let elements = [];
        for (let i = 0; i < depth + DEPTH_OFFSET; i++) {
            elements.push(<div class="indent"></div>);
        }
    }

    toggleExpanded = () => {
        this.state.expanded = !this.state.expanded;
        this.setState(this.state);
    }

    getObjectContent = (depth, src, props) => {
        return (<div class="pushed-content object-container">
            <div class="push">{this.renderPush(depth)}</div>
            <div class="object-content">
                {this.renderObjectConents(src, props)}
            </div>
        </div>);
    }

    getElipsis = (expanded) => {
        return (
            <div class="collapsed-elipsis" onClick={this.toggleExpanded}>
                ...
            </div>
        );
    }

    getObjectMetaData = (src) => {
        const size = Object.keys(src).length;
        return (
            <VariableMeta size={size} src={src} />
        );
    }

    render = () => {
        const {depth, src, name, ...rest} = this.props;
        const {expanded} = this.state;
        const expanded_class = expanded ? "expanded" : "collapsed";
        const expanded_icon = expanded ? <CircleMinus /> : <CirclePlus />;

        return (<div class="object-key-val">
            <div onClick={this.toggleExpanded} class="open-brace brace-row">
                <div class={"icon-container " + expanded_class}>
                    {expanded_icon /*mdi icon*/}
                </div>
                <div class="object-name">{
                    (name ? name : '')
                }</div>
                <div class="object-colon">:</div>
                <div class="brace">{'{'}</div>
                {expanded ? this.getObjectMetaData(src) : null}
            </div>
            {expanded
                ? this.getObjectContent(depth, src, rest)
                : this.getElipsis(expanded)
            }
            <div class="close-brace brace-row">
                <div class="brace">{'}'}</div>
                {expanded ? null : this.getObjectMetaData(src)}
            </div>
        </div>);
    }

    renderObjectConents = (variables, props) => {
        const {depth} = this.props;
        let elements = [], variable;

        for (let name in variables) {
            variable = new JsonVariable(name, variables[name]);
            if (variable.type == 'object') {
                elements.push(
                    <JsonObject key={variable.name}
                        depth={depth + 1}
                        name={variable.name}
                        src={variable.value}
                        {...props}
                    />);
            } else {
                elements.push(<div class="object-key-val" key={variable.name}>
                    <div class="object-key">
                            {variable.name}
                        <div class="key-colon">:</div>
                    </div>
                    {getValue(variable)}
                </div>);
            }
        }
        return elements;

        function getValue(variable) {
            switch (variable.type) {
                case 'string':
                    return <JsonString value={variable.value} />;
                case 'number':
                    return <JsonNumber value={variable.value} />;
                case 'array':
                    return <JsonArray value={variable.value} />;
                case 'boolean':
                    return <JsonBoolean value={variable.value} />;
                case 'function':
                    return <JsonFunction value={variable.value} />;
                case 'null':
                    return <JsonNull />;
                case 'nan':
                    return <JsonNan />;
                default:
                    //catch-all for types that weren't anticipated
                    return <div class="object-value">{variable.value}</div>;
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