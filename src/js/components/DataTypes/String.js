import React from 'react';
import DataTypeLabel from './DataTypeLabel';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.Component {

    render() {
        const type_name = 'string';
        const {props} = this;
        return (
        <div {...Theme(props.theme, 'string')}>
            <DataTypeLabel type_name={type_name} {...props} />
            "{this.props.value}"
        </div>
        );
    }

}