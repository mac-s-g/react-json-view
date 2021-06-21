import React from 'react';

//theme
import Theme from './../../themes/getStyle';
import { DataTypeLabel } from './DataTypeLabel';

export class JsonBoolean extends React.PureComponent {
    render() {
        const type_name = 'bool';
        const { props } = this;

        return (
            <div {...Theme(props.theme, 'boolean')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span style={{backgroundColor: props.isCurrent ? 'orange' : props.highlight ?  'yellow' : 'inherit'}}>
                    {props.value ? 'true' : 'false'}
                </span>
            </div>
        );
    }
}
