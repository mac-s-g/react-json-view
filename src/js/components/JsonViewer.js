import React from 'react';
import JsonObject from './DataTypes/Object';
import ArrayGroup from './ArrayGroup';
import OptimizedArrayGroup from './OptimizedArrayGroup';

export default class extends React.PureComponent {
    render = () => {
        const { props } = this;
        const namespace = [props.name];
        let ObjectComponent = JsonObject;

        if (
            Array.isArray(props.src) &&
            props.groupArraysAfterLength &&
            props.src.length > props.groupArraysAfterLength
        ) {
            if(props.useOptimizedArray) ObjectComponent = OptimizedArrayGroup;
            else ObjectComponent = ArrayGroup;
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
