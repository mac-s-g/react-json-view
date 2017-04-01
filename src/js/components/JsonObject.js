import React from "react";
import {toType} from './../helpers/util';
import JsonObject from './JsonObject';

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
        return (<div class="pushed-content">
            <div class="push">{this.renderPush(depth)}</div>
            <div class="object-content">
                {this.renderObjectConents(src, props)}
            </div>
        </div>);
    }

    getElipsis(expanded) {
        return (<div class="collapsed-elipsis">...</div>);
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
            </div>
            {expanded
                ? this.getObjectContent(depth, src, rest)
                : this.getElipsis(expanded)
            }
            <div class="close-brace brace-row">
            <div class="brace">{'}'}</div>
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
            //TODO put each of these into their own components
            //eg: <JsonString>{value}</JsonString>
            switch (variable.type) {
                case 'string':
                    return <div class="object-value string">
                        <span class="data-type">string</span>
                        {variable.value}
                    </div>;

                case 'number':
                    return <div class="object-value number">
                        <span class="data-type">number</span>
                        {variable.value}
                    </div>;

                case 'array':
                    return <div class="object-value array">
                        <span class="data-type">array</span>
                        [{variable.value.toString()}]
                    </div>;

                case 'boolean':
                    if (variable.value) {
                        return <div class="object-value boolean">
                            <span class="data-type">boolean</span>
                            True
                        </div>;

                    } else {
                        return <div class="object-value boolean">
                            <span class="data-type">boolean</span>
                            False
                        </div>;

                    }
                case 'function':
                    return <div class="object-value function">
                        <span class="data-type">function</span>
                        {variable.value.toString().slice(9, -1)}
                    </div>;

                case 'null':
                    return <div class="object-value null">
                        NULL
                    </div>;

                case 'nan':
                    return <div class="object-value nan">
                        NaN
                    </div>;

                default:
                    return <div class="object-value">
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