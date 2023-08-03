import React from 'react';
//theme
import Theme from './../../themes/getStyle';
import { DataTypeLabel } from './DataTypeLabel';

export class JsonRegexp extends React.PureComponent {
    render() {
        const type_name = 'regexp';
        const { props } = this;
        return (
            <div {...Theme(props.theme, 'regexp')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span style={{backgroundColor: props.isCurrent ? 'orange' : props.highlight ?  'yellow' : 'inherit'}}>
                    {this.props.value.toString()}
                </span>
            </div>
        );
    }
}
