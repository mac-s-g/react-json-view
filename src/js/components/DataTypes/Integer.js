import React from 'react';

//theme
import Theme from './../../themes/getStyle';
import { DataTypeLabel } from './DataTypeLabel';

export class JsonInteger extends React.PureComponent {
    render() {
        const type_name = 'int';
        const { props } = this;
        return (
            <div {...Theme(props.theme, 'integer')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span style={{backgroundColor: props.isCurrent ? 'orange' : props.highlight ?  'yellow' : 'inherit'}}>{this.props.value}</span>
            </div>
        );
    }
}
