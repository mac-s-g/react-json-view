import React from 'react';
import DataTypeLabel from './DataTypeLabel';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.PureComponent {
    render() {
        const type_name = 'date';
        const { props } = this;
        const display_options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return (
            <div {...Theme(props.theme, 'date')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span class="date-value" {...Theme(props.theme, 'date-value')}>
                    {props.value.toLocaleTimeString('en-us', display_options)}
                </span>
            </div>
        );
    }
}
