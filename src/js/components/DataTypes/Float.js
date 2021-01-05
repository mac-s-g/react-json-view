import React from 'react';
import DataTypeLabel from './DataTypeLabel';

//theme
import Theme from './../../themes/getStyle';
import highlightedString from './../../helpers/highlightedString';
import stringifyVariable from './../../helpers/stringifyVariable';

export default class extends React.PureComponent {

    render() {
        const type_name = 'float';
        let {
            value,
            search,
            theme
        } = this.props;
        const valueStr = stringifyVariable(value);
        const start = (valueStr).indexOf(search);
        if (start > -1) {
            value = highlightedString(valueStr, start, search.length, theme);
        }
        return (
            <div {...Theme(theme, 'float')}>
                <DataTypeLabel type_name={type_name} {...this.props} />
                {value}
            </div>
        );
    }

}
