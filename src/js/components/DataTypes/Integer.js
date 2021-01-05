import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import highlightedString from './../../helpers/highlightedString';
import stringifyVariable from './../../helpers/stringifyVariable';

//theme
import Theme from './../../themes/getStyle';

export default class extends React.PureComponent {

    render() {
        const type_name = 'int';
        const {props} = this;
        const valueStr = stringifyVariable(props.value);
        const start = (valueStr).indexOf(props.search);
        let value = props.value;
        if (start > -1) {
            value = highlightedString(valueStr, start, props.search.length, props.theme);
        }
        return (
            <div {...Theme(props.theme, 'integer')}>
                <DataTypeLabel type_name={type_name} {...props} />
                {value}
            </div>
        );
    }

}
