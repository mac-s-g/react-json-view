import React from 'react';
import DataTypeLabel from './DataTypeLabel';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.PureComponent {
    render() {
        const type_name = 'float';
        const { props } = this;
        return (
            <div {...Theme(props.theme, 'float')}>
                <DataTypeLabel type_name={type_name} {...props} />
                {this.props.value}
            </div>
        );
    }
}
