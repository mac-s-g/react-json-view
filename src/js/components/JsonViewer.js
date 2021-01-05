import React from 'react';
import JsonObject from './DataTypes/Object';
import ArrayGroup from './ArrayGroup';

export default class extends React.PureComponent {
    render = () => {
        const {
            name,
            src,
            groupArraysAfterLength
        } = this.props;
        const namespace = [name];
        let ObjectComponent = JsonObject;

        if (groupArraysAfterLength && src.length > groupArraysAfterLength) {
            ObjectComponent = ArrayGroup;
        }

        return (
            <div class="pretty-json-container object-container" >
                <div class="object-content">
                    <ObjectComponent
                        namespace={namespace}
                        depth={0}
                        jsvRoot={true}
                        {...this.props} />
                </div>
            </div>
        );
    }
}
