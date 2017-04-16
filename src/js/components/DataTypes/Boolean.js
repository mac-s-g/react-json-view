import React from 'react';
import DataTypeLabel from './DataTypeLabel';


export default class extends React.Component {

    render() {
        const type_name = 'boolean';
        if (this.props.value) {
            return <div class={"object-value " + type_name}>
                <DataTypeLabel type_name={type_name} />
                True
            </div>;

        } else {
            return <div class={"object-value " + type_name}>
                <DataTypeLabel type_name={type_name} />
                False
            </div>;

        }
    }

}