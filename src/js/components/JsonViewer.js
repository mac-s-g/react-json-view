import React from 'react';
import JsonObject from './DataTypes/Object';
import ArrayGroup from './ArrayGroup';

export default class extends React.PureComponent {
    render = () => {
        const { props } = this;
        const namespace = [props.name];
        let ObjectComponent = JsonObject;

        const size = Array.isArray(props.src) ? props.src.length: Object.keys(props.src).length;
        if (
            props.groupArraysAfterLength &&
            size > props.groupArraysAfterLength
        ) {
            ObjectComponent = ArrayGroup;
        }

        return (
            <div class="pretty-json-container object-container">
                <div class="object-content">
                    <ObjectComponent
                        namespace={namespace}
                        depth={0}
                        jsvRoot={true}
                        {...props}
                    />
                </div>
            </div>
        );
    };
}
