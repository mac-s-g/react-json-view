import React from 'react';
import DataTypeLabel from './DataTypeLabel';


export default class extends React.Component {

    render() {
        const type_name = 'integer';
        return (
        <div class={"object-value " + type_name}>
            <DataTypeLabel type_name={type_name} />
            {this.props.value}
        </div>
        );
    }

}