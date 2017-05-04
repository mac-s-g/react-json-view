import React from 'react';
import DataTypeLabel from './DataTypeLabel';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.Component {

    render() {
        const type_name = 'function';
        const {props} = this;
        return (
        <div {...Theme(props.theme, 'function')}>
            <DataTypeLabel type_name={type_name} {...props} />
            {this.props.value.toString().slice(9, -1)}
        </div>
        );
    }

}