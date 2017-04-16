import React from 'react';
import DataTypeLabel from './DataTypeLabel';


export default class extends React.Component {

    render() {
        const type_name = 'function';
        return (
        <div class={"object-value " + type_name}>
            <DataTypeLabel type_name={type_name} />
            {this.props.value.toString().slice(9, -1)}
        </div>
        );
    }

}