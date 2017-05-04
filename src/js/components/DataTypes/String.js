import React from 'react';
import DataTypeLabel from './DataTypeLabel';

//theme
import style from './../../themes/getStyle';

export default class extends React.Component {

    render() {
        const type_name = 'string';
        const {props} = this;
        return (
        <div {...style(props.theme, 'string')}>
            <DataTypeLabel type_name={type_name} {...props} />
            "{this.props.value}"
        </div>
        );
    }

}