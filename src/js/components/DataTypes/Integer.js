import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import highlightedString from './../../helpers/highlightedString';
import stringifyVariable from './../../helpers/stringifyVariable';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.PureComponent {
    render() {
        const type_name = 'int';
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
            <div {...Theme(theme, 'integer')}>
                <DataTypeLabel type_name={type_name} {...this.props} />
                {value}
            </div>
        );
    }
}
