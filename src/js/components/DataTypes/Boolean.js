import React from 'react';
import DataTypeLabel from './DataTypeLabel';

//theme
import style from './../../themes/getStyle';


export default class extends React.Component {

    render() {
        const type_name = 'bool';
        const {props} = this;
        if (this.props.value) {
            return <div {...style(props.theme, 'boolean')}>
                <DataTypeLabel type_name={type_name} {...props} />
                True
            </div>;

        } else {
            return <div {...style(props.theme, 'boolean')}>
                <DataTypeLabel type_name={type_name} {...props} />
                False
            </div>;

        }
    }

}