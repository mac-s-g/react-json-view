import React from 'react';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.PureComponent {
    render() {
        const { rjvId, type_name, displayDataTypes, theme } = this.props;
        if (displayDataTypes) {
            return (
                <span
                    class="data-type-label"
                    {...Theme(theme, 'data-type-label')}
                >
                    {type_name}
                </span>
            );
        }
        return null;
    }
}
