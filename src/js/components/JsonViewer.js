import React from "react";
import {JsonObject, JsonString, JsonInteger, JsonFloat, JsonBoolean, JsonNull} from './DataTypes/DataTypes';
import {toType} from '../helpers/util';
import PropTypes from 'prop-types';

export default class extends React.Component {
    static propTypes = {
        src: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ])
    };

    renderRootContainer() {
        const {props}   = this;

        switch (props.type) {
            case 'object':
            case 'array':
                return <JsonObject
                    namespace={[props.name]}
                    depth={0}
                    jsvRoot={true}
                    {...props}
                />;
            case 'string':
                return <JsonString
                    value={props.src}
                    {...props}
                />;
            case 'integer':
                return <JsonInteger
                    value={props.src}
                    {...props}
                />;
            case 'float':
                return <JsonFloat
                    value={props.src}
                    {...props}
                />;
            case 'boolean':
                return <JsonBoolean
                    value={props.src}
                    {...props}
                />;
            case 'null':
                return <JsonNull
                    value={props.src}
                    {...props}
                />;

            default:
                const message = `src property must not be ${props.type}`;
                console.error(
                    'react-json-view error:',
                    message
                );
                return <JsonObject
                    namespace={['ERROR']}
                    depth={0}
                    jsvRoot={true}
                    {...props}
                    src={{message}}
                />;
        }
    }

    render() {
        return (
            <div className="pretty-json-container object-container">
                <div className="object-content">
                    {this.renderRootContainer()}
                </div>
            </div>
        );
    }
}
